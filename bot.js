#!/usr/bin/env node

`Washington State Ferry reserver`


const fs = require('fs');
const puppeteer = require("puppeteer");

let config = {

};


setTimeout(go, 1);


async function go() {

	console.log("Here we go.");

	const browser = await puppeteer.launch({
		headless: !!config.headless,
		defaultViewport: null
	});
	const page = await browser.newPage();
	await page.goto('https://secureapps.wsdot.wa.gov/ferries/reservations/vehicle/default.aspx', {waitUntil: 'networkidle2'});

	await page.click("#btnContinue");

	let fromselector = "#MainContent_dlFromTermList";
	// await page.waitForSelector(fromselector);
	// await page.focus(fromselector);
	// await page.type(fromselector, "a");
	await page.waitForSelector(fromselector);
	await page.select(fromselector, "1");

	await page.waitForTimeout(1000);
	let toselector = "#MainContent_dlToTermList";
	await page.select(toselector, "15");

	await page.type("#MainContent_txtDatePicker", "03182021");
	await page.keyboard.down('Tab');

	await page.select("#MainContent_dlVehicle", "3");

	let tallsel = "#MainContent_ddlCarTruck14To22"
	await page.waitForSelector(tallsel);
	await page.select(tallsel, "1000");

	console.log("all selected up. now continue");

	await page.waitForTimeout(2000);

	await page.waitForSelector("#MainContent_btnContinue");
	await page.click("#MainContent_btnContinue");

	console.log("we continued");


	let tablesel = "#MainContent_gvschedule tr td:nth-child(1) input:enabled";
	await page.waitForSelector(tablesel, { timeout: 10000 });
	let times = await page.$$eval(tablesel, inputs => inputs.map(input => {
		//    span          td            tr
		let time = input.parentElement.parentElement.parentElement.children[1].innerText;
		return [input.id, time];
	}));
	if (times.length == 0) {
		console.log("Nothing available");
		return;
	}

	let [id,time] = times[times.length-1];
	console.log('Booking', time);
	await page.click('#' + id);

	await page.waitForTimeout(2000);
	await page.waitForSelector("#MainContent_hAddToCart");

	// let captcha = await page.$(".recaptcha-checkbox");
	// if (!captcha) {
	// 	console.log("cant find captcha");
	// 	return;
	// }
	// console.log(captcha);
	let captchaPos = await page.evaluate(() => {
		let x = 0, y = 0;
		let element = document.querySelector("#MainContent_hAddToCart");
		while (element) {
			x += element.offsetLeft;
			y += element.offetTop;
			element = element.offsetParent;
		}
		y -= 50;  // captcha is up there somewhere
        return {x, y};
    });

	console.log(captchaPos);

	await page.mouse.move(captchaPos.x, captchaPos.y);


	// document.querySelector(".recaptcha-checkbox");

	// <div class="recaptcha-checkbox-border" role="presentation"></div>

	// document.querySelectorAll("#MainContent_gvschedule tr td:nth-child(1) input:enabled")[0].parentElement.parentElement.parentElement.tagNam
	// tr.children[1].innerText == "5:30 AM";

	// reCAPTCHA couldn't find user-provided function: loadCaptcha
	// document.querySelector('#processMessage')
	//MainContent_btnRefresh
}


