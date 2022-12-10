import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "projectCard" ]
  static values = {
    showCard: Array
  }

  filterCard(event) {

    if (this.showCardValue.length === 0) {
      this.showCardValue = [event.target.dataset.value]
      event.target.classList.add("bg-green-200")
      event.target.classList.remove("bg-transparent")
    } else if (this.showCardValue.includes(event.target.dataset.value)) {
      event.target.classList.remove("bg-green-200")
      event.target.classList.add("bg-transparent")
      this.showCardValue = this.showCardValue.filter(category => category !== event.target.dataset.value)
    } else {
      event.target.classList.add("bg-green-200")
      event.target.classList.remove("bg-transparent")
      this.showCardValue = [...this.showCardValue, event.target.dataset.value]
    }

    this.projectCardTargets.forEach((element, index) => {
      if (this.showCardValue.length === 0) {
        element.classList.remove("hidden")
      } else {
        if (this.showCardValue.filter(cardValue => element.classList.contains(cardValue)).length === 0) {
          element.classList.add("hidden")
        } else {
          element.classList.remove("hidden")
        }
      }
    })

 
  }
}
