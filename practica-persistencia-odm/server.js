import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js";

// El server recibe las rutas y recibe el puerto 
export class Server {
  #controllers = {}
  #app
  #routes
  
  constructor(app, port) {
    this.#app = app
    this.port = port
    this.#routes = []
    this.#app.use(express.json()) 
  }

  get app() {
    return this.#app
  }

  setController(controllerClass, controller) {
    this.#controllers[controllerClass.name] = controller
  }

  getController(controllerClass) {
    const controller = this.#controllers[controllerClass.name]
    if (!controller) {
      throw new Error("Controller missing for the given route.")
    }
    return controller;
  }

  addRoute(route) {
    this.#routes.push(route)
  }


  configureRoutes() {
    this.#routes.forEach(route => this.#app.use(route(this.getController.bind(this)))) 

    // Middleware para manejar rutas no encontradas
    this.#app.use((req, res, next) => {
      res.status(404).json({
        status: 'fail',
        message: "La ruta solicitada no existe"
      });
    });

    // Middleware global de manejo de errores
    this.#app.use(errorHandler);
  }

  launch() {
    this.app.listen(this.port, () => {
      console.log("Server running on port " + this.port)
    });
  }
}