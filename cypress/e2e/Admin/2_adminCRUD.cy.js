import { faker } from "@faker-js/faker";

//admin data
const adminUser = 'Administrador'
const adminPassword = 'Administrador'

//user data
const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const userName = firstName + faker.number.int({min:0,max:9});
const email = userName + "@hotmail.com";
const password1 = "userpass";

//category data
const categoryName = faker.person.jobArea();
const categoryLocation = faker.person.jobTitle();

//product data
const productBarCode = faker.string.binary({
  length: { min: 5, max: 10 },
});
const productName = faker.commerce.product();
const productPrice = faker.number.int({ min: 0, max: 1000 });
const productStock = faker.number.int({ min: 0, max: 100 });
const optionSelect = faker.number.int({ min: 0, max: 4 });

var openBurguer = () => {
  cy.visit("http://localhost/inventario/");
  cy.get("input[name=login_usuario]").type("Administrador");
  cy.get('input[name="login_clave"]').type("Administrador");
  cy.get(".button").click();
  cy.get(".navbar-burger").click();
};

var addOne = (word) => {
  switch (word) {
    case "user":
      openBurguer();
      cy.get('[href="index.php?vista=user_new"]').click();
      cy.get('input[name="usuario_nombre"]').type(firstName);
      cy.get('input[name="usuario_apellido"]').type(lastName);
      cy.get('input[name="usuario_usuario"]').type(userName);
      cy.get('input[name="usuario_email"]').type(email);
      cy.get('input[name="usuario_clave_1"]').type(password1);
      cy.get('input[name="usuario_clave_2"]').type(password1);
      cy.get(".has-text-centered > .button").click();
      break;
    case "category":
      openBurguer();
      cy.get('[href="index.php?vista=category_new"]').click();
      cy.get(":nth-child(1) > .control > .input").type(categoryName);
      cy.get(":nth-child(2) > .control > .input").type(categoryLocation);
      cy.get(".has-text-centered > .button").click();
      cy.get(".notification").should("exist");
      break;
    case "product":
      openBurguer();
      cy.get('[href="index.php?vista=product_new"]').click();
      cy.get(":nth-child(1) > :nth-child(1) > .control > .input").type(
        productBarCode
      );
      cy.get(":nth-child(1) > :nth-child(2) > .control > .input").type(
        productName
      );
      cy.get('input[name="producto_precio"]').type(productPrice);
      cy.get('input[name="producto_stock"]').type(productStock);
      cy.get('select[name="producto_categoria"]')
        .select(1)
        .should("have.value", 1);
      cy.get('input[type="file"]').selectFile("cv-photo.jpg", { force: true });
      cy.get(".has-text-centered > .button").click();
      cy.get(".notification").should("exist");
      break;
    default:
      break;
  }
};

var searchOne = (word, name) => {
  switch (word) {
    case "user":
      openBurguer();
      cy.get('a[href="index.php?vista=user_search"]').click();
      cy.get('input[name="txt_buscador"]').type(name);
      cy.get(":nth-child(2) > .button").click();
      cy.get(".has-text-right").should("exist");
      break;
    case "category":
      openBurguer();
      cy.get('[href="index.php?vista=category_search"]').click();
      cy.get(".input").type(name);
      cy.get(":nth-child(2) > .button").click();
      break;
    case "product":
      openBurguer();
      cy.get('[href="index.php?vista=category_search"]').click();
      cy.get(".input").type(name);
      cy.get(":nth-child(2) > .button").click();
      break;
    default:
      break;
  }
};

var searchAll = (word) => {
  switch (word) {
    case "users":
      openBurguer();
      cy.get('[href="index.php?vista=user_list"]').click();
      break;
    case "categories":
      openBurguer();
      cy.get('[href="index.php?vista=category_list"]').click();
      break;
    case "products":
      openBurguer();
      cy.get('[href="index.php?vista=product_list"]').click();
      break;
    default:
      break;
  }
};

var editOne = (word, data) => {
  switch (word) {
    case "user":
      openBurguer();
      cy.get('[href="index.php?vista=user_list"]').click();
      cy.get(":nth-child(1) > :nth-child(6) > .button").click();

      cy.get(":nth-child(2) > :nth-child(1) > .control > .input").clear().type(
        firstName + data
      );
      cy.get(":nth-child(2) > :nth-child(2) > .control > .input").clear().type(
        lastName + data
      );
      cy.get(':nth-child(3) > :nth-child(1) > .control > .input').clear().type(
        userName + data
      );
      cy.get(":nth-child(3) > :nth-child(2) > .control > .input").clear().type(
        data + email
      );
      cy.get(':nth-child(8) > :nth-child(1) > .control > .input').clear().type(password1 + data)
      cy.get(':nth-child(8) > :nth-child(2) > .control > .input').clear().type(password1 + data)
      cy.get(':nth-child(13) > :nth-child(1) > .control > .input').clear().type(adminUser)
      cy.get(':nth-child(13) > :nth-child(2) > .control > .input').clear().type(adminPassword)
      cy.get(':nth-child(14) > .button').click()
      cy.get('.notification').should('exist')
      break;
    case "category":
      openBurguer();
      cy.get('[href="index.php?vista=category_list"]').click()
      cy.get(':nth-child(1) > :nth-child(5) > .button').click()
      cy.get(':nth-child(1) > .control > .input').clear().type(categoryName + 'EDITADO')
      cy.get(':nth-child(2) > .control > .input').clear().type(categoryLocation + 'EDITADO')
      cy.get('.has-text-centered > .button').click()
      cy.get('.notification').should('exist')
      break;
    case "product":
      openBurguer();
      cy.get('[href="index.php?vista=product_list"]').click()
      cy.get(':nth-child(1) > .media-content > .has-text-right > .is-success').click()
      cy.get(':nth-child(2) > :nth-child(1) > .control > .input').clear().type('EDITADO')
      cy.get(':nth-child(2) > :nth-child(2) > .control > .input').clear().type('EDITADO')
      cy.get(':nth-child(3) > :nth-child(1) > .control > .input').clear().type('EDITADO')
      cy.get(':nth-child(3) > :nth-child(2) > .control > .input').clear().type('EDITADO')
      cy.get('select').select(optionSelect)
      break;
    default:
      break;
  }
};

var deleteOne = (word, data) => {
  switch (word) {
    case "user":
      openBurguer();
      cy.get('[href="index.php?vista=user_list"]').click();
      cy.get(":nth-child(1) > :nth-child(7) > .button").click();
      cy.get(".notification").should("exist");
      break;
    case "category":
      openBurguer();
      cy.get('[href="index.php?vista=category_list"]').click();
      cy.get(":nth-child(1) > :nth-child(6) > .button").click();
      cy.get(".notification").should("exist");
      break;
    case "product":
      openBurguer();
      cy.get('[href="index.php?vista=product_list"]').click();
      cy.get(
        ":nth-child(1) > .media-content > .has-text-right > .is-danger"
      ).click();
      cy.get(".notification").should("exist");
      break;
    default:
      break;
  }
};

describe("ADMIN", () => {
  describe("CRUD", () => {
    describe("Users", () => {
      it("Add one user", () => {
        addOne("user");
      });

      it("Search one user", () => {
        searchOne("user", "mauricio");
      });

      it("Search all users", () => {
        searchAll("users");
      });

      it("Edit one user", () => {
        editOne("user", "EDITADO");
      });

      it("Delete one user", () => {
        deleteOne("user");
      });
    });

    describe("Categories", () => {
      it("Add one category", () => {
        addOne("category");
      });

      it("Search one category", () => {
        searchOne("category", "a");
      });

      it("Search all categories", () => {
        searchAll("categories");
      });

      it("Edit one category", () => {
        editOne('category')
      });

      it("Delete one category", () => {
        deleteOne("category");
      });
    });

    describe("Products", () => {
      it("Add product", () => {
        addOne("product");
      });
      it("Search one product", () => {
        searchOne("product", "a");
      });

      it("Search all products", () => {
        searchAll("products");
      });
      it("Edit product", () => {
        editOne('product')
      });

      it("Delete one product", () => {
        deleteOne("product");
      });
    });
  });
});