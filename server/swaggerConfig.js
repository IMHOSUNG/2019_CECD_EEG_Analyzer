const swaggerJSDoc = require('swagger-jsdoc')

var swaggerDefinition ={
    "info":{
        title : 'Brain Data API',
        version : '1.0.0',
        description : 'API about Brain Data'
    },
    "host" : 'localhost:3000',
    "basePath" : '/',
    "tags": [
        {
          "name": "EEGs",
          "description": "API for EEGs in the system"
        }
      ],
      "schemes": [
        "http"
      ],
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "paths": {
        "/upload/": {
            "post": {
              "tags": [
                "EEGs"
              ],
              "description": "Create new EEG in system",
              "parameters": [
                {
                  "name": "EEG",
                  "in": "body",
                  "description": "EEG that we want to create",
                  "schema": {
                    "$ref": "#/definitions/EEG"
                  }
                }
              ],
              "produces": [
                "application/json"
              ],
              "responses": {
                "200": {
                  "description": "New EEG is created",
                  "schema": {
                    "$ref": "#/definitions/EEG"
                  }
                }
              }
            },
            "get": {
              "tags": [
                "EEGs"
              ],
              "summary": "Get all EEGs in system",
              "responses": {
                "200": {
                  "description": "OK",
                  "schema": {
                    "$ref": "#/definitions/EEGs"
                  }
                }
              }
            }
          },
        "/EEGs/{EEGId}": {
          "parameters": [
            {
              "name": "EEGId",
              "in": "path",
              "required": true,
              "description": "ID of EEG that we want to find",
              "type": "string"
            }
          ],
          "get": {
            "tags": [
              "EEGs"
            ],
            "summary": "Get EEG with given ID",
            "responses": {
              "200": {
                "description": "EEG is found",
                "schema": {
                  "$ref": "#/definitions/EEG"
                }
              }
            }
          },
          "delete": {
            "summary": "Delete EEG with given ID",
            "tags": [
              "EEGs"
            ],
            "responses": {
              "200": {
                "description": "EEG is deleted",
                "schema": {
                  "$ref": "#/definitions/EEG"
                }
              }
            }
          },
          "put": {
            "summary": "Update EEG with give ID",
            "tags": [
              "EEGs"
            ],
            "parameters": [
              {
                "name": "EEG",
                "in": "body",
                "description": "EEG with new values of properties",
                "schema": {
                  "$ref": "#/definitions/EEG"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "EEG is updated",
                "schema": {
                  "$ref": "#/definitions/EEG"
                }
              }
            }
          }
        }
      },

      
      "definitions": {
        "EEG": {
          "required": [
            "Band",
            "_id",
            "Value"
          ],
          "properties": {
            "_id": {
              "type": "string",
              "uniqueItems": true
            },
            "Band": {
              "type": "string"
            },
            "Value": {
              "type": "string"
            },
            "TimeStamp": {
              "type": "string"
            }
          }
        },
        "EEGs": {
          "type": "array",
          "$ref": "#/definitions/EEG"
        }
      }

}

var options ={
    definition: swaggerDefinition,
      // Path to the API docs
    apis: ['./**/router/*.js','routes.js'],
}

var swaggerSpec = swaggerJSDoc(options)
module.exports = swaggerSpec