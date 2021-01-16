<p align="center">
  <img width="250" height="280" src="Documentation/images/nsu-logo.png">
</p>                                        

  <h1 align="center">Project Name: Tutor Connect</h1>
  <h2 align ="center">Course Number: CSE 299<br>
  Section: 3</br>
  Semester: Fall 2020</br><br>
  Faculty Name: Shaikh Shawon Arefin Shimon<br>
  Group: 7<br>
  Student Name: Samiya Kazi<br>
  Student ID: 1711620642<br>
  Email: <a href="mailto:samiya.kazi@northsouth.edu"> samiya.kazi@northsouth.edu</a> </h2>
  <br><br>


<h2> Project Name: Tutor Connect </h2><br>
<h3 id="table-of-contents">Table of Contents: </h3>

<ol>
  <a href="#introduction"><li>Introduction</li><br></a>
  <a href="#features"><li>Software Specification</li><br></a>
  <a href="#technology"><li>Technology</li><br></a>
  <a href="#businessplan"><li>Business Plan/Monetization</li></a><br>
  <a href="#conclusion"><li>Conclusion</li></a><br><hr>
</ol>
<br><br>

<h2 id="introduction">1. Introduction</h2>
<h3>1.1 Project Idea:</h3>
<p>Tutoring students is the most common job for students and young adults in Bangladesh. However, the process of finding tuition offers is difficult and can be troublesome for some. Along with that, finding a suitable tutor for your child takes time and background checks. Having a place where tuition offers and tutors are located together can make both of these jobs much easier.</p>
<p>The goal of this project is to create a web app where tutors have access to available tuition offers and parents get access to a plethora of tutors and a means to contact them. Users will be able to see tuition offers and their information, like location and salary, upfront. They will also be able to see the background information of the tutors that want to offer their services.</p>

<h2 id="features">1. Software Specification</h2>
<p>The features of this project are the following &ndash;
<h3>2.1 User registration</h3>
<p>
	In order to post on the web application or apply to already posted offers, users must sign up. Users are able to sign up using an email address. They will need to give an email address, password, first name and last name. The first and last names are used as display names on the app.
</p>
<br><br>
<p align="center">
   <img width="700" height="420" src="Documentation/images/signup.png"><br>
   Figure 1.0 &ndash; Sign up page
</p>
<h3>2.2 User profiles</h3>
<p>
	Users will individual profiles where they can add their information. The information that can be seen are their name, email address, phone number, bio and location. That user's posts will also be displayed on their profile. Users can also edit their own profile. They are able to update all information except their name and email address.
</p>
<br><br>
<p align="center">
   <img width="700" height="420" src="Documentation/images/profile.png"><br>
   Figure 2.0 &ndash; User profile
</p>
<br>
<p align="center">
   <img width="700" height="420" src="Documentation/images/editprofile.png"><br>
   Figure 2.1 &ndash; Edit profile form for logged in user
</p>
<br><br>
<h3>2.3 Post Offers</h3>
<p>
	Once logged in users can post tuition offers with their criteria. The homepage displays a form when a user is logged in for posting offers. The user must specify the medium/version of the child's schooling, class, description of what needs to be taught, location, salary and duration for the offer.
</p>
<br><br>
<p align="center">
   <img width="700" height="420" src="Documentation/images/postform.png"><br>
   Figure 3.0 &ndash; New offer form for logged in users
</p>
<br><br>
<h3>2.3 Apply to Offers and See Answers</h3>
<p>
	Once logged in users can apply to offers made by other users. They are also able to see who applied to the offers they posted and can view their profile to learn about the applicant's background and contact information.
</p>
<br><br>
<p align="center">
   <img width="700" height="420" src="Documentation/images/apply.png"><br>
   Figure 4.0 &ndash; Apply option enabled for logged in user
</p>
<br><br>
<p align="center">
   <img width="700" height="420" src="Documentation/images/answer.png"><br>
   Figure 4.1 &ndash; Answers open to view in user's own post
</p>
<br><br>


<p><strong>Technology</strong></p>
<p><em>Frontend:</em></p>
<p>For the front-end I will use HTML, CSS, React, and Material-UI. The web app will be compatible with both PC and mobile browsers. Redux will help with managing component states while Material-UI will ensure compatibility between platforms.</P>
<p><em>Backend:</em></p>
<p>For the backend of the web application, I will be using Node.js to manage packages and scripts.</p>
<p><em>Database:</em></p>
<p>For the database aspect of the project I will use Firebase, more specifically Cloud Firestore. This will allow us to have a real-time NoSql database and provide login authentication.</p>
<p>&nbsp;</p>
<p><strong>Monetization</strong></p>
<p>Tutors pay a membership fee when signing up of BDT 500. The payment will be taken through bKash. I will be using bKash as it is the most popular medium for online transactions.</p>
<p>&nbsp;</p>
<p><strong>Social Impact</strong></p>
<p>This web application will aim to make finding suitable tutors for children easier. As many young adults and university students look towards tutoring jobs as a source of income, it can get hard to find many tutors that are appropriate for the offer. Alongside that, it can be difficult for a tutor to find available offerings just through word of mouth or social media. The application will aim in connecting these two parties to ensure the best experience for both.</p>
<p>&nbsp;</p>