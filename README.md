# **DirectRep**
⚡️ Powered by: [Google Civics API](https://developers.google.com/civic-information) and [OpenAI GPT3](https://beta.openai.com/docs/models/gpt-3) ⚡️

DirectRep is an app that allows users to write letters to their elected representatives using Artifical Intelligence to generate the body text given a specific "issue" and "stance" on that issue. The user's representatives are gathered using [Google Civic Information API](https://developers.google.com/civic-information) and are determined by the Zip Code the user provides on Sign-Up. 

\*\*Disclaimers\*\*  
There may be data missing from Google Civics API which may lead to certain representatives not being shown in the results. Always double check and verify your representatives data.


<br>


## 👾**Developers**👾
### **[Kim Geraghty](https://gitlab.com/kim.geraghty.kg)** -- FullStack Developer  
### **[Aaryan Mittal](https://gitlab.com/aaryanmittal154)** -- FullStack Developer  
### **[Vincent Phung](https://gitlab.com/vincent.h.phung)** -- FullStack Developer  
### **[John Gardner](https://gitlab.com/John.Gardner)** -- FullStack Developer  


<br><br>


## 🗺️**Diagram of Architecture**🗺️

---

<br>

<p align="center">
	<img src="https://i.imgur.com/1wxwuWE.jpg"/>
</p>
<br><br><br>

## 👥**Users Microservice**👥 -- `:8080`

<br><br>

### **Endpoints**


|      **Page**       | **Request Type** |             **Path**              |
| :-----------------: | :--------------: | :-------------------------------: |
|     Signup Page     |      `POST`      |    localhost:8080/api/accounts    |
|     Login Page      |      `POST`      |       localhost:8080/token        |
|      Get Token      |      `GET`       |       localhost:8080/token        |
| Update Profile Page |      `PUT`       | localhost:8080/api/accounts/`$id` |
|     Logout Page     |     `DELETE`     |       localhost:8080/token        |

<br>

### **Database Models**  
*(values in parenthesis are max values. e.g. VARCHAR(255) is a variable character with a max_length of 255 characters)*
<br><br><br>
#### **'user' database table**
|    **Field**    |    **FieldType**     | **\*\*options** |
| :-------------: | :------------------: | :-------------: |
|       id        | `SERIAL PRIMARY KEY` |   `NOT NULL`    |
|    full_name    |    `VARCHAR(255)`    |   `NOT NULL`    |
|      email      |    `VARCHAR(255)`    |   `NOT NULL`    |
|     zipcode     |     `VARCHAR(5)`     |   `NOT NULL`    |
| hashed_password |    `VARCHAR(255)`    |   `NOT NULL`    |


<br><br><br>

## 📨**Letters Microservice**📨 -- `:8090`

### **Local Endpoints**


|                  **Page**                  | **Request Type** |                **Path**                 |
| :----------------------------------------: | :--------------: | :-------------------------------------: |
|               Create Letter                |       POST       |       localhost:8090/api/letters        |
|           Get All User's Letters           |       GET        |         localhost:8090/letters          |
|              Edit Letter Body              |       PUT        |  localhost:8090/letters/`${letter_id}`  |
|               Delete Letter                |      DELETE      |  localhost:8090/letters/`${letter_id}`  |
|             Get Single Letter              |       GET        |  localhost:8090/letters/`${letter_id}`  |
|               Get ALL issues               |       GET        |        localhost:8090/api/issues        |
|             Get Reps from API              |       GET        |          localhost:8090/civics          |
|                 Select Rep                 |       POST       |         localhost:8090/api/reps         |
|          Get SINGLE Rep Selection          |       GET        |      localhost:8090/reps/${rep_id}      |
| Get ALL Rep Selections for SPECIFIC letter |       GET        | localhost:8090/reps/letter/${letter_id} |


<br><br><br>


### **3rd Party API Endpoints**


| **Page** | **Request Type** |      **Path**       |
| :------: | :--------------: | :-----------------: |
|   test   |       POST       | localhost:8090/path |

### **Database Models**  
*(values in parenthesis are max values. e.g. VARCHAR(255) is a variable character with a max_length of 255 characters)*

<br><br><br>
#### **'letter' database table**
|  **Field**   |    **FieldType**     |      **\*\*options**       |
| :----------: | :------------------: | :------------------------: |
|      id      | `SERIAL PRIMARY KEY` |         `NOT NULL`         |
|   created    |     `TIMESTAMP`      | `DEFAULT CURRENT_TIMESTAMP |
|    topic     |   `VARCHAR(1000)`    |         `NOT NULL`         |
|    stance    |      `BOOLEAN`       |         `NOT NULL`         |
|   user_id    |      `INTEGER`       |         `NOT NULL`         |
|      id      | `SERIAL PRIMARY KEY` |         `NOT NULL`         |
|  user_issue  |    `VARCHAR(1000)    |         `NOT NULL`         |
| openai_issue |   `VARCHAR(1000)`    |         `NOT NULL`         |
<br><br><br>

#### **'issue' database table**
|  **Field**   |    **FieldType**     | **\*\*options** |
| :----------: | :------------------: | :-------------: |
|      id      | `SERIAL PRIMARY KEY` |   `NOT NULL`    |
|  user_issue  |   `VARCHAR(1000)`    |    `NOT NULL    |
| openai_issue |   `VARCHAR(1000)`    |   `NOT NULL`    |
<br><br><br>

#### **'rep' database table**
|  **Field  |    **FieldType**     |                               **\*\*options**                                |
| :-------: | :------------------: | :--------------------------------------------------------------------------: |
|  rep_id   | `SERIAL PRIMARY KEY` |                                  `NOT NULL`                                  |
|  office   |    `VARCHAR(255)`    |                                  `NOT NULL`                                  |
|   level   |    `VARCHAR(255)`    |                                  `NOT NULL`                                  |
|   name    |    `VARCHAR(255)`    |                                  `NOT NULL`                                  |
|  address  |   `VARCHAR(1000)`    |                                  `NOT NULL`                                  |
|   email   |    `VARCHAR(255)`    |                                  `NOT NULL`                                  |
| letter_id |        `INT`         | `FOREIGN KEY (letter_id)`<br>`REFERENCES (letter_id)`<br>`ON DELETE CASCADE` |
<br><br><br>




**Key Features**
---

### **Location Dependent Representative Results**

> Your list of available representatives is pulled from Google Civics API using the Zip Code provided on Sign-Up

### **AI Generated Text Response**

> When creating a letter, your "issue" and "stance" are sent to a 3rd party API that then uses a large-language model to generate the letter body the users desires.

### **User Customization**

> When the AI returns your letter body, the user can change, add, or remove any part of the letter, making it fully customizable and ensuring the voice accurately represents the user.

### **Account Dependent Information**

> After creating an account and creating letters, the letters you see in your Dashboard are only the letters you created

### **Account Dependent Information**

> After creating an account and creating letters, the letters you see in your Dashboard are only the letters you created

<br>

## **Getting the App Started**
---

1. Git clone into your local repository
	`git clone «repo»`
2. cd into it
   `cd direct-rep`
3. Create a volume and name it beta-data
	`docker volume create postgres-data`
4. Build the image and run the container
	`docker compose up --build`
5.  Open browser to http://localhost:3000 to make sure it’s running
6.  Once it’s up and running, you can begin with creating an account and confirming that account. Once you confirm the account, you can create a new letter.
