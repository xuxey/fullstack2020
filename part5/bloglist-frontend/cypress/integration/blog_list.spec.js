describe('Blog app', function () {
    const user = {
        username: 'blingching',
        name: 'Bling Ching',
        password: 'fourtwenty'
    }
    const blogs = [
        {
            title: 'React is nice',
            author: 'xuxe',
            url: 'xuxe.com',
            likes: 39
        },
        {
            title: 'Node is nice too',
            author: 'xuxe',
            url: 'xuxe.com',
            likes: 69
        }
    ]
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/tests/reset')
        cy.request('POST', 'http://localhost:3001/api/users', user)
        cy.visit('http://localhost:3000')
    })


    describe('Login', function () {
        beforeEach(function () {
            cy.clearLocalStorage('blogUser')
            cy.visit('http://localhost:3000')
        })
        it('Login form is shown', function () {
            cy.contains('Login')
        })
        it('succeeds with correct credentials', function () {
            cy.contains('Login')
            cy.get('#username').type(user.username)
            cy.get('#password').type(user.password)
            cy.get('#login-button').click()

            cy.contains('Logged in')
        })

        it('fails with wrong credentials', function () {
            cy.contains('Login')
            cy.get('#username').type('abcdefglol')
            cy.get('#password').type('abcdefglol')
            cy.get('#login-button').click()

            cy.contains('Username or password is incorrect')
        })
    })
    describe.only('When logged in', function () {
        beforeEach(function () {
            cy.request('POST', 'http://localhost:3001/api/tests/reset')
            cy.request('POST', 'http://localhost:3001/api/users', user)
            cy.login({username: user.username, password: user.password})
        })

        it('A blog can be created', function () {
            cy.get('#blog-form-toggle').click()
            cy.get('#blogform-title').type('My Test Blog')
            cy.get('#blogform-author').type('I am relon')
            cy.get('#blogform-url').type('myblog.lol')
            cy.get('#blog-submit').click()

            cy.contains('Blog My Test Blog added successfully')
        })
        describe('When blogs exist', function () {
            beforeEach(function () {
                cy.createBlog(blogs[0])
                cy.createBlog(blogs[1])
            })
            it('Blog can be liked', function () {
                cy.get('#view-blog-toggle').click()
                cy.get('#likes-display').contains(blogs[0].likes)
                cy.get('#blog-like-button').click()
                cy.get('#likes-display').contains(blogs[0].likes + 1)
            })
            it('Blog can be deleted by owner', function () {
                cy.get('#view-blog-toggle').click()
                cy.contains('#blog-delete')
            })
            it('Blog ordered by likes', function () {
                //todo
            })
        })
    })
})
