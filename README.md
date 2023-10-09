# RAF Cloud Provider Simulation

## Introduction

RAF Cloud is a web application that simulates a cloud provider's functionality. The application allows users to create and manage virtual machines and associated resources. This README provides an overview of the project's features, requirements, and technologies used.

## Project Overview

The project is divided into two main domains: User Management and Machine Management.

### User Management

User management is defined as in the third homework assignment, with the addition of new permissions related to machine management.

### Machine Management

Machines have the following mandatory attributes:

- Name
- Type
- Description
- id (unique identifier)
- Status (Enum: STOPPED, RUNNING)
- createdBy (Reference to the user who created the machine)
- Active (Boolean, indicating whether the machine is soft-deleted)

Additional attributes can be added or modified as needed. Each machine belongs to its creator, and creators can only see their own machines.

Actions that can be performed on machines:

- SEARCH
- START
- STOP
- RESTART
- CREATE
- DESTROY

Each action is associated with a permission. Six new permissions are added to support these actions: `can_search_machines`, `can_start_machines`, `can_stop_machines`, `can_restart_machines`, `can_create_machines`, `can_destroy_machines`. Users without specific permissions cannot access or perform the corresponding actions.

Operations START, STOP, and RESTART are not instant, and they require some time to complete. While one of these operations is in progress, other operations on the same machine must be blocked.

Successful calls to any functionality must return a response immediately with a 2xx status code. Operations START, STOP, and RESTART return a response immediately, and their execution on the selected machine continues in the background. After completing any of these actions, the frontend is notified of the machine's state change using WebSockets.

### Actions/Operations on Machines

#### SEARCH

Returns a list of active machines for the logged-in user. The following table represents possible search parameters, all of which are optional:

- Name (Case-insensitive comparison)
- Status (List of statuses)
- Date range (dateFrom and dateTo)

#### START

A machine in any state other than STOPPED cannot be started. The start process takes 10+ seconds with a configurable deviation.

#### STOP

A machine in any state other than RUNNING cannot be stopped. The stop process takes 10+ seconds with a configurable deviation.

#### RESTART

A machine in any state other than RUNNING cannot be restarted. The restart process takes 10+ seconds with a configurable deviation. After half of the specified time, the machine is set to STOPPED, and after the full time, it is set back to RUNNING.

#### CREATE

This action is instant and used to create a new machine. All mandatory parameters must be provided. The result is a machine in the STOPPED state, associated with the logged-in user.

#### DESTROY

This action is instant and can only be performed on machines in the STOPPED state. It marks the machine as deleted but does not remove it from the database.

### Scheduling Operations on Machines

Operations START, STOP, and RESTART can be scheduled. Users can specify a date and time for these operations. At the designated time, the system should attempt to perform the operation if the conditions are met. If the operation fails, it should be recorded in a new table called ErrorMessage, which includes the date, machine ID, the operation that was scheduled, and an error message.

## Frontend

In addition to the user management interface from the third homework assignment, the frontend must implement two new pages:

1. Machine Search Page: Displays all machines initially, and users can apply filters to search for specific machines based on various criteria.
2. Machine Creation Page: Provides a simple form for creating new machines, with only the name required. Other attributes such as ID, status, and user will be determined by the backend.
3. Error History Page: Displays a table of errors that occurred during scheduled operations. Only errors related to machines of the logged-in user should be shown.

Users without specific permissions cannot access or perform the corresponding actions on the frontend. If a user has no permissions, they should be alerted after a successful login.

# Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
