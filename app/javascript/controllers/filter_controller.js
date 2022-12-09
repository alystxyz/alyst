import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "projectCard" ]
  static lastFilterUsed = ""

  filterCard(event) {
    this.projectCardTargets.forEach((element, index) => {
      if (this.lastFilterUsed === event.target.dataset.value) {
          element.classList.remove("hidden")
      } else if (!element.className.includes(event.target.dataset.value)) {
        element.classList.add("hidden")
      }

    })
    this.lastFilterUsed = this.lastFilterUsed === event.target.dataset.value ? "" : event.target.dataset.value;
  }
}


