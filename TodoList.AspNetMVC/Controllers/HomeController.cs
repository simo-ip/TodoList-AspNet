using DataAccess;
using DataAccess.Entities;
using Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ToDoApp.Models;
using ToDoApp.ViewModels;

namespace ToDoApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly IToDoTaskModel toDoTaskModel;
        private readonly ITodoViewModel _model;
        private readonly ITodoService _service;

        public HomeController(ITodoService service, IToDoTaskModel toDoTaskModel, ITodoViewModel todoViewModel)
        {
            this.toDoTaskModel = toDoTaskModel;
            this._model = todoViewModel;
            _service = service;
        }

        public ActionResult List(int? id = 1)
        {
            ViewBag.Pages =  _service.GetPageNumber();
            ViewBag.CurrentPage = id;
            _model.Entity = new Todo();
            _model.List =  _service.GetData(id.GetValueOrDefault()).TodoList;
            if (TempData["errorMsg"] != null)
            {
                //ModelState.AddModelError("", TempData["errorMsg"].ToString());
                ViewData["errorMsg"] = TempData["errorMsg"];
            }
            return View(_model);
        }

        public ActionResult Add()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Add(Todo model)
        {
            if (ModelState.IsValid)
            {
                toDoTaskModel.Add(model);
                return RedirectToAction("List");
            }
            var errors = ModelState.Values.SelectMany(x => x.Errors);
            string err = String.Empty;
            foreach (var e in errors)
            {
                err += e.ErrorMessage;
            }
            TempData["errorMsg"] = err;
            return RedirectToAction(nameof(List));
        }

        public ActionResult Edit(int id)
        {
            var model = toDoTaskModel.GetById(id);
            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(string submitButton, Todo model)
        {
            switch (submitButton)
            {
                case "Save":
                    {
                        return Update(model);
                    }
                case "Delete":
                    {
                        return Delete(model.TodoId);
                    }
                default:
                    {
                        return RedirectToAction(nameof(List));
                    }
            }
        }

        private ActionResult Update(Todo model)
        {
            if (ModelState.IsValid)
            {
                toDoTaskModel.Update(model);
                return Redirect(HttpContext.Request.Headers["Referer"]);
            }

            return View(model);
        }

        private ActionResult Delete(int id)
        {
            toDoTaskModel.Delete(id);
            return Redirect(HttpContext.Request.Headers["Referer"]);
        }
    }
}