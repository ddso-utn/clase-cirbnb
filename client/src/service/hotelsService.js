import {hoteles} from "../mockdata/Hoteles";

export const getHotelsSlowly = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve(hoteles)
  }, 5000)
})

