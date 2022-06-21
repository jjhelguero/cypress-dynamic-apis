/// <reference types="cypress" />

const spok = require('cy-spok')
const oneFruit = [
    {
        type: 'fruit',
        name: 'pineapple'
    }
]
const twoFruit = [
    {
        type: 'fruit',
        name: 'grapes'
    },
    {
        type: 'fruit',
        name: 'orange'
    }
] 
const threeFruit = [
    {
        type: 'fruit',
        name: 'plum'
    },
    {
        type: 'fruit',
        name: 'cherry'
    },
    {
        type: 'fruit',
        name: 'strawberry'
    }
]
const fruits = [oneFruit, twoFruit, threeFruit]

fruits.forEach(fruitList => {
    it(`check fruits shown`, () => {
        // dynamically stub response with fruits array
        cy.intercept('GET', '/api/fruits', req => {
            req.reply({fruits: fruitList})
        }).as('fruit')
        cy.visit('/')
        cy.wait('@fruit')
        .its('response.body')
        // check fruits property and should be an array with 
        // length equal to stubbed fruit response
        .should('have.a.property', 'fruits')
        .should('be.an', 'array')
        .and('have.length', fruitList.length)
        .each(fruit => {
            const fruitName = fruit.name
            // check each fruit matches the stubbed fruit
            cy.wrap(fruit).should(
                spok({
                    type: fruit.type,
                    name: fruitName
                })
            )
            // check each option matches stubbed fruit
            cy.contains('option', fruitName)
              .should('be.visible')
              .should('have.text', fruitName)
              .should('have.value', fruitName)
        })

        // check length of all fruits
        cy.get('#fruitSelection option')
          .should('have.length', fruitList.length)
    })
})