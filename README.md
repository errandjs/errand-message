# errand-message
> [errand](https://github.com/errandjs/errand) worker component used for sending messages

## Usage

```

npm install errand-message

```

Notes:

1. For dependencies and suggested usage of errand worker components refer to [errand](https://github.com/errandjs/errand)
2. Set environment variables:
  2.1 ERRAND_MONGODB_URL with connection string for mongodb server, if not set module will default to `mongodb://localhost:27017`
  2.2 ERRAND_NODEMAILER_SERVICE, ERRAND_NODEMAILER_SERVICE_USE & ERRAND_NODEMAILER_SERVICE_PASS with email service, use https://nodemailer.com/smtp/well-known/ as guide for configuration




## Example

```

{
	"tasks": [

		{
			"task": "errand-message",
			"data": {
				"description": "replace-with-task-description",
				"request": {
					"database": "replace-with-mongodb-database-name",
					"collection": "replace-with-name-of-collection",
					"method": "email",
					"parameters": {
						...
					}
				}
			}
		}

	]
}

```

Notes:

* **tasks** - [errand](https://github.com/errandjs/errand) task list
* **tasks[].task** - required `errand-message` task name
* **tasks[].data.description** - optional task description
* **tasks[].data.request.database** - required mongodb database name
* **tasks[].data.request.collection** - required mongodb collection name
* **tasks[].data.request.method** - required message method
* **tasks[].data.request.parameters** - required method parameters, the parameter payload will vary depending on method

### Email Example 

```

{
	"tasks": [

		{
			"task": "errand-message",
			"data": {
				"description": "replace-with-task-description",
				"request": {
					"database": "replace-with-mongodb-database-name",
					"collection": "replace-with-name-of-collection",
					"method": "email",
					"parameters": {
						"from": "replace-with-from-email",
						"to": "replace-with-to-email",
						"subject": "replace-with-subject",
						"template": "replace-with-handlebars-template-name",
						"context": {
							"firstname": "Sam",
							"lastname": "Sample"
						}						
					}
				}
			}
		}

	]
}

```

Notes:

* **tasks[].data.request.parameters.from** - required from email
* **tasks[].data.request.parameters.to** - required to email
* **tasks[].data.request.parameters.subject** - required email subject line
* **tasks[].data.request.parameters.template** - required handlebars template name, for example `/views/email`, refer to [errand usage notes](https://github.com/errandjs/errand#usage) for how to pass directory location for templates files names to component, do not include extension with filename
* **tasks[].data.request.parameters.context** - optional variables that can be used in the body of the email template

