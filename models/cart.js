const path = require('path')
const fs = require('fs')

const PATH = path.join(path.dirname(require.main.filename), 'data', 'cart.json')

class Cart {

    static async add(course) {
        const cart = await Cart.fetch()

        const index = cart.courses.findIndex(element => element.id === course.id)
        const current = cart.courses[index]

        if (current) {
            current.count += 1
            cart.courses[index] = current
        }
        else {
            course.count = 1
            cart.courses.push(course)
        }

        cart.price += +course.price

        return new Promise((resolve, reject) => {
            fs.writeFile(PATH, JSON.stringify(cart), error => {
                if (error) {
                    reject(error)
                }
                else {
                    resolve()
                }
            })
        })
    }

    static async delete(id) {
        const cart = await Cart.fetch()

        const index = cart.courses.findIndex(element => element.id === id)
        const course = cart.courses[index]

        if (course.count === 1) {
            cart.courses = cart.courses.filter(element => element.id !== id)
        }
        else {
            cart.courses[index].count--
        }

        cart.price -= course.price

        return new Promise((resolve, reject) => {
            fs.writeFile(PATH, JSON.stringify(cart), error => {
                if (error) {
                    reject(error)
                }
                else {
                    resolve(cart)
                }
            })
        })
    }

    static async fetch() {
        return new Promise((resolve, reject) => {
            fs.readFile(PATH, 'utf-8', (error, content) => {
                if (error) {
                    reject(error)
                }
                else {
                    resolve(JSON.parse(content))
                }
            })
        })
    }
}

module.exports = Cart