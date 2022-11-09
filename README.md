

# InputForm

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## UI Requirements(Assumptions)

- Input form
    Form should be able to save data.
	Form should not allow to save data with the same `Name`, `Age`, `Weight`. When there is a same person, application should show an alert with `There is a same person already!` message.
	
  Form fields:
	- `Name`: String(Required)
	- `Weight`: Number only(Required)
	- `Age`: Number only(Required)
	- `Friends`: String Array(Optional)
- List
	Show list with already added data.
	The user should be able to select a row and the data should be filled into the input form to edit.
  `(For now deleting data is not a requirement in this assumption)`
- Chart
Y axis: Count of the friends of the person
X axis: Name of the person with `Age`, `Weight` as we don't allow a person who has the same `Name`, `Age`, `Weight`
- Application should be mobile responsive

## Technical Requirements(Assumptions)

- [Angular](https://angular.io/) latest version(v14)
- [Angular Material](https://material.angular.io/) as UI component library
- [Bootstrap](https://getbootstrap.com/) for customized CSS built-in
- [D3](https://d3js.org/) for visualization
- [NgRx](https://ngrx.io/) for state management
- Components should be stateless
- State should be persisted for browser session
