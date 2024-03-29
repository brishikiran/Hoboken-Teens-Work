const express = require("express");
const router = express.Router();
const data = require("../data");
const users = data.users;
const jobs = data.jobs;
const path = require('path')
const validation = require('../validation')

router.route("/").get(async (req, res) => {
	//check aithentication
	const title = "Hoboken Teens Work";
	var login = false;
	var loginUserData = null;
	if (req.session.user !== undefined) {
		//if have cookie, auto login
		//console.log(req.session.user)
		try {
			//check the if the id is valid
			await users.getUserById(validation.checkId(req.session.user.id));
			login = true;
			loginUserData = req.session.user;
		} catch (e) {
			//if the cookie stored id is not valid, delete the cookie
			//console.log(e)
			req.session.destroy();
		}
	}
	//recieve data from jobsDatabase
	var jobData = [];
	var errormsg = "";
	try {
		jobData = await jobs.getAllJobs();
	} catch (e) {
		//fail to get data from database
		errormsg = e;
		res.status(500)
	}
	if (jobData.length===0) errormsg = "No job available."

	for(job of jobData) {
		words = job.jobDescription.split(" ");
		if(words.length <= 15) {
			continue;
		  } else {
			 let description = "";
			 for(i = 0; i < 15; i++) {
			  description += `${words[i]} `;
			 }
			 job.jobDescription = description.trim() + "...";
		  }
	}

	res.render("homepage", {
		title: title,
		login: login,
		loginUserData: loginUserData,
		jobList: jobData,
		errormsg: errormsg,
	});
	return
})
.all(async(req,res)=>{
	//other method should not Allowed
	res.status(405)
	res.sendFile(path.resolve("static/inValidRequest.html"));
	return
});

module.exports = router;
