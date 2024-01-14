# Text-Analysis

## Usage

### API Endpoints

1. **Upload Text File**
   - **Endpoint:** `POST /api/v1/uploadFile`
   - **Description:** Upload a text file for analysis.
   - **Request Body:** Include a `file` parameter with the text file.
   - **Response:** Returns a JSON object with `fileId` and success message.
     ```json
     {
         "fileId": "1d33c5be-d6c8-45b4-8725-b68b09f3f7b2",
         "msg": "File is successfully uploaded"
     }
     ```

2. **Initiate Analysis Task**
   - **Endpoint:** `POST /api/v1/analyze/:fileId`
   - **Description:** Start a text analysis task on an uploaded file.
   - **Request Body:** Include a JSON object in the body with `operation` and `options`.
     ```json
     {
         "operation": "findTopKWords",
         "options": {"k":2}
     }
     ```
   - **Response:** Returns a JSON object with `taskId` and status.
     ```json
     {
         "taskId": "708fb84a-fbfd-42cd-afc0-148605aba3a8",
         "status": "pending"
     }
     ```

3. **Retrieve Analysis Results**
   - **Endpoint:** `GET /api/v1/analysis-result/:taskId`
   - **Description:** Retrieve the results of a text analysis task.
   - **Response:** Returns the analysis results for the specified `taskId`.
     ```json
     {
         "taskId": "708fb84a-fbfd-42cd-afc0-148605aba3a8",
         "status": "completed",
         "result": [
             { "word": "esse", "frequency": 7 },
             { "word": "non", "frequency": 6 }
         ]
     }
     ```
