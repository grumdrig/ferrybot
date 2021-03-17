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

	await page.waitForSelector("#MainContent_btnContinue");
	await page.click("#MainContent_btnContinue");

	console.log("we continued");

	await page.waitForTimeout("2000");

	let tablesel = "#MainContent_gvschedule";

}


