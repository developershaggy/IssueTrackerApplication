# Issue_Tracker_CN
 Issue Tracker App for tracking issues with a project



Libraries used:

	1. express
	2. mongoose
	3. node-sass-middleware
	4. nodemon
	5. ejs
	6. express-ejs-layouts
	7. bootstrap
	8. jquery
	9. noty js
    10. dotenv




Approach: 

1) Two main pages, the projects and the issues page
2) every project has its own issues
3) So, two schemas required, project and issue
4) using mongodb for storing these schemas
5) when the page loads, get the documents i.e projects/issues through data-attribute 
6) store the projects or issues list as an array on the front end, so that we can do sorting or filtering without the page  being reloaded
7) styles using node sass middleware and bootstrap
8) for adding an issue or project, used offCanvas from bootstrap and for displaying the project-item or issue-item, used bootstrap cards
9) Used Noty JS for showing the notifications