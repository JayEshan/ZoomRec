process.env.DISPLAY = ':99';

const { Client, LocalAuth } = require("whatsapp-web.js");
const { launch, getStream } = require("puppeteer-stream");
const fs = require("fs");
const path = require('path');
const { exec } = require("child_process");

console.log("Starting...");


// Specify Browser path
const executablePath = "/usr/bin/chromium-browser";
//const executablePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe" 


// Define Global Variables
let browser;
let stream;
let file;
let fileName;
let sub;
let sender;
let admin_number = "94782026000@c.us";
let userNameForZoom = "Mirai";
let gDrivePath;

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: [
      "--disable-gpu",
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-first-run",
      "--no-sandbox",
      "--no-zygote",
    ],
    executablePath: executablePath,
    headless: true,
  },
});

client.on("ready", async () => {
  console.log("READY");
  if (fs.existsSync("/home/ubuntu/gdrive/Sem IV/")) {
    client.sendMessage(
      admin_number,
      "Client Ready. Google Drive Already Mounted."
    );
  } else {
    let gDrive = await executeCommand("google-drive-ocamlfuse ~/gdrive");

    if (!gDrive) {
      client.sendMessage(admin_number, "Failed to Mount Google Drive");
    } else {
      client.sendMessage(admin_number, "Google Drive Mounted.");
    }
  }
});

async function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        const errorMessage = JSON.stringify(error);
        const stderrMessage = stderr ? `Command error: ${stderr}` : "";

        console.log(`Error occurred: ${errorMessage}`);
        console.log(stderrMessage);

        resolve(false);
        return;
      } else {
        resolve(true);
      }
    });
  });
}

async function browserLaunch() {
  return new Promise(async (resolve, reject) => {
    try {
      const XvfbDisplay = await executeCommand(
        "Xvfb :99 -screen 0 1280x720x8 -ac +extension GLX +render -noreset > /dev/null 2>&1 &"
      );

      if (XvfbDisplay) {
        process.env.DISPLAY = ":99";
        client.sendMessage(sender, "_Starting_...");
        browser = await launch({
          headless: false,
          executablePath: executablePath,
          defaultViewport: null,
          args: [
            "--display=:99",
            "--autoplay-policy=no-user-gesture-required",
            "--no-sandbox",
            "--disable-first-run",
            "--disable-setuid-sandbox",
            "--no-zygote",
            "--disable-infobars",
            "--enable-automation",
            "--start-fullscreen",
            "--window-size=1280,720",
          ],
        });
      }
      resolve(browser);
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
}

async function nameValidation(meetingName) {
  return new Promise(async (resolve, reject) => {
    const currentDate = new Date();
    const date2 = currentDate.toString().split(" ");
    const timebydate = date2[4].split(":");
    const date = date2[3] + "-" + date2[1] + "-" + date2[2] + ", " + timebydate[0] + "-" + timebydate[1];

    otherFileName = meetingName;
    meetingName = meetingName.toUpperCase();

    switch (meetingName) {
      case "IPDRP":
        sub = "Integrative Product Design and Research Project";
        gDrivePath = "/home/ubuntu/gdrive/Sem VII/Integrative Product Design and Research Project/";
        files = fs.readdirSync(gDrivePath);
        lectureNum = files.length + 1;
        fileName = `Lec 0${lectureNum} - Integrative Product Design and Research Project -${date}-`;
        break;

      case "CS":
        sub = "Control Systems";
        gDrivePath = "/home/ubuntu/gdrive/Sem VII/Control Systems/";
        files = fs.readdirSync(gDrivePath);
        lectureNum = files.length + 1;
        fileName = `Lec 0${lectureNum} - Control Systems -${date}-`;
        break;

      case "CIM":
        sub = "Computer Integrated Manufacturing";
        gDrivePath = "/home/ubuntu/gdrive/Sem VII/Computer Integrated Manufacturing/";
        files = fs.readdirSync(gDrivePath);
        lectureNum = files.length + 1;
        fileName = `Lec 0${lectureNum} - Computer Integrated Manufacturing -${date}-`;
        break;

      case "BS":
        sub = "Building Services";
        gDrivePath = "/home/ubuntu/gdrive/Sem VII/Building Services/";
        files = fs.readdirSync(gDrivePath);
        lectureNum = files.length + 1;
        fileName = `Lec 0${lectureNum} - Building Services -${date}-`;
        break;

      case "PM":
        sub = "Production Management";
        gDrivePath = "/home/ubuntu/gdrive/Sem VII/Production Management/";
        files = fs.readdirSync(gDrivePath);
        lectureNum = files.length + 1;
        fileName = `Lec 0${lectureNum} - Production Management -${date}-`;
        break;

      case "EM":
        sub = "Environment Management";
        gDrivePath = "/home/ubuntu/gdrive/Sem VII/Environment Management/";
        files = fs.readdirSync(gDrivePath);
        lectureNum = files.length + 1;
        fileName = `Lec 0${lectureNum} - Environment Management -${date}-`;
        break;

      case "MAT":
        sub = "Modern Automotive Technology";
        gDrivePath = "/home/ubuntu/gdrive/Sem VII/Modern Automotive Technology/";
        files = fs.readdirSync(gDrivePath);
        lectureNum = files.length + 1;
        fileName = `Lec 0${lectureNum} - Modern Automotive Technology -${date}-`;
        break;

      case "HM1":
        sub = "Humanities Module 1";
        gDrivePath = "/home/ubuntu/gdrive/Sem VII/Humanities Module 1/";
        files = fs.readdirSync(gDrivePath);
        lectureNum = files.length + 1;
        fileName = `Lec 0${lectureNum} - Humanities Module 1 -${date}-`;
        break;

      default:
        sub = "Other";
        gDrivePath = "";  // or set a default path if you want
        fileName = otherFileName;
        break;
    }
    resolve();
  });
}



async function waitingForElement(page, element, time, interval) {
  return new Promise(async (resolve) => {
    var whileTill = 0;
    var elementExist = null;

    while (whileTill <= time) {
      elementExist = await page.$(`${element}`);

      //await page.waitForTimeout(interval * 1000);
      await new Promise(resolve => setTimeout(resolve, interval * 1000));

      if (elementExist) {
        resolve(true);
        console.log("Element Found");
        break;
      }
      console.log("Checking : ", whileTill);
      console.log(time, whileTill);
      whileTill = whileTill + interval;
    }

    resolve(false);
  });
}

async function startRecording(
  meetingId,
  meetingPassCode,
  userName,
  meetingName,
  ms
) {
  await nameValidation(meetingName);
  await browserLaunch();
  const page = await browser.newPage();
  const zoomUrl = `https://zoom.us/wc/${meetingId}/join?from=join`;

  // Log in to Zoom Meeting
  await page.goto(zoomUrl, { waitUntil: "networkidle2" });

  // Allow Join Without Mic AND Camara
  try {
    // Wait until the button exists
    await page.waitForFunction(() => {
      const xpath = '/html/body/div[6]/div/div/div/div[1]/div[2]/div/div[3]';
      const result = document.evaluate(
        xpath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      );
      return result.singleNodeValue !== null;
    }, { timeout: 10000 });

    // Try clicking the button twice in case the first click fails
    await page.evaluate(() => {
      const xpath = '/html/body/div[6]/div/div/div/div[1]/div[2]/div/div[3]';
      const result = document.evaluate(
        xpath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      );
      const button = result.singleNodeValue;
      if (button) {
        button.click();
        setTimeout(() => button.click(), 500); // click again after 500ms
      }
    });

    console.log("✅ Button clicked once or twice.");
  } catch (error) {
    console.error("❌ Failed to click the button:", error.message);
  }


  await new Promise(resolve => setTimeout(resolve, 1000));
  // Logging to Meetingent(page, ".zm-modal", 14400, 45);
  await page.waitForSelector('#input-for-pwd', { visible: true });
  await page.type('#input-for-pwd', meetingPassCode);

  await page.waitForSelector('#input-for-name', { visible: true });
  await page.type('#input-for-name', userName);

  await page.waitForSelector('.preview-join-button', { visible: true });
  await page.click('.preview-join-button');

  // Start recording
  /*  const currentDirectoryfiles = fs.readdirSync(__dirname).filter(file => path.extname(file) === '.webm');
    console.log("Found .webm files:", currentDirectoryfiles);
  
    // Check if it already exists
    if (currentDirectoryfiles.includes(targetFile)) {
      console.log(`${targetFile} already exists, Renaming`);
      fileName = fileName + "Part"
    } else {
      console.log(`${targetFile} does not exist.`);
    }*/

  file = fs.createWriteStream(`./Recordings/${fileName}.webm`);
  stream = await getStream(page, { audio: true, video: true });
  stream.pipe(file);

  client.sendMessage(
    ms.currentStatus.msgFrom,
    "*Recording Started Successfully!*"
  );


  await new Promise(resolve => setTimeout(resolve, 15000));

  try {
    try {
      await page.evaluate(() => {
        const btn = document.querySelector('button[aria-label="View"]');
        if (btn) btn.click();
        else throw new Error('View button not found');
      });
    } catch (err) {
      console.error("Error clicking 'View' button:", err.message);
    }

    // Step 2: Wait for dropdown to appear
    try {
      await page.waitForSelector('a.dropdown-item', { visible: true, timeout: 1000 });
    } catch (err) {
      console.error("Dropdown did not appear:", err.message);
    }

    // Step 3: Click "Hide Non-Video Participants" (if exists)
    try {
      await page.evaluate(() => {
        const item = Array.from(document.querySelectorAll('a.dropdown-item'))
          .find(el => el.textContent.trim() === "Hide Non-video Participants");
        if (item) item.click();
        else throw new Error("'Hide Non-video Participants' not found");

      });
    } catch (err) {
      console.error("Error clicking 'Hide Non-Video Participants':", err.message);
    }


    // Step 5: Click "Fullscreen"
    try {
      await page.evaluate(() => {
        const fullscreenItem = Array.from(document.querySelectorAll('a.dropdown-item'))
          .find(el => el.textContent.trim() === "Fullscreen");
        if (fullscreenItem) fullscreenItem.click();
        else throw new Error('"Fullscreen" item not found');
      });
    } catch (err) {
      console.error("Error clicking 'Fullscreen':", err.message);
    }

    // To close all notofication alerts
    try {
      await page.evaluate(() => {
        document.querySelectorAll('[role="alert"]').forEach(el => {
          const container = el.closest('.notification-message-wrap');
          if (container) container.remove();
          else el.remove(); // fallback if no container
        });
      });
    } catch (err) {
      console.log(err)
    }


    // To click below button notofication button
    try {
      await page.evaluate(() => {
        const okButton = Array.from(document.querySelectorAll('button'))
          .find(btn => btn.textContent.trim() === 'OK' || btn.getAttribute('aria-label') === 'OK');
        if (okButton) okButton.click();
      });
    } catch (err) { console.log(err) }



    // Self Destroying  recording after meeting end.
    while (true) {
      console.log("Inside the self distroying checker..")
      await waitingForElement(page, ".zm-modal", 14400, 45);
      const recordingEndByHostBody = await page.waitForSelector(
        ".zm-modal-body-title"
      );

      const text = await page.evaluate(
        (recordingEndByHostBody) => recordingEndByHostBody.textContent,
        recordingEndByHostBody
      );

      if (text == "This meeting has been ended by host") {
        await stopRecording(ms);
        break;
      }

      client.sendMessage(admin_number, "Host Meeting Ended, Sucessfully Detected.!")
    }
  } catch (error) {
    console.log(error.message);

    client.sendMessage(
      admin_number,
      `*Error in startRecording() Function*\n\n${error.message}`
    );

    // Self Destroying  recording after meeting end.
    while (true) {
      await waitingForEleme.evaluate(
        (recordingEndByHostBody) => recordingEndByHostBody.textContent,
        recordingEndByHostBody
      );

      if (text == "This meeting has been ended by host") {
        await stopRecording(ms);
        break;
      }
    }
  }
}

function getFilesizeInMB(filename) {
  const stats = fs.statSync(filename);
  const fileSizeInBytes = stats.size;
  const fileSizeInMb = fileSizeInBytes / (1024 * 1024);
  const formattedFileSize = fileSizeInMb.toFixed(2); // Format to two decimal places
  return formattedFileSize;
}

async function stopRecording(ms) {

  console.log("Host Ended meeting, Stopping recording...");
  client.sendMessage(ms.currentStatus.msgFrom, "_*Stopping Recording*_...");
  client.sendMessage(admin_number, "_*Stopping Recording*_...");

  try {
    ms.currentStatus.status = false;
    ms.currentStatus.name = null;
    ms.currentStatus.msgFrom = false;
    ms.ifEncodingHas = true;
    updateFile(ms);

    // File Saving
    if (stream && file) {
      await stream.destroy();
      await file.close();
    }

    // Browser Closing
    if (browser) {
      await browser.close();
    }

    // Display Closing
    await executeCommand("pkill Xvfb");

    // Encodng and Uploading to Google Drive
    client.sendMessage(admin_number, "Encoding Started.");
    const ffmpegCommand = await executeCommand(`ffmpeg -i "./Recordings/${fileName}.webm" -c:v libx265 -preset slow -crf 28 -x265-params keyint=250:min-keyint=25:no-scenecut=1 -c:a aac -ac 1 -b:a 48k "./Encoded/${fileName}.mkv"`);
    console.log(ffmpegCommand);
    
    if (ffmpegCommand) {
      console.log("Encoding done successfully!");
      client.sendMessage(admin_number, "Encoding Complete.");
      await executeCommand(`cp "./Encoded/${fileName}.mkv" "gDrivePath/${fileName}.mkv"`);
      client.sendMessage(admin_number, "Uploded to G Drive");
    } else {
      console.log("Encoding failed!");
      client.sendMessage(admin_number, "Encoding failed!")
    }




  } catch (e) {
    console.log(e);
  }
}

function updateFile(newData, deletedData = false) {
  saveFileName = "./meetingShedule.json";

  // Read the existing data from the file
  let existingData = [];
  try {
    existingData = JSON.parse(fs.readFileSync(saveFileName));
  } catch (error) {
    console.error(`Error reading file ${saveFileName}:`, error);
    return;
  }

  if (deletedData) {
    updatedData = newData;
  } else {
    // Merge the existing data with the new data
    updatedData = { ...existingData, ...newData };
  }

  // Write the updated data back to the file
  try {
    fs.writeFileSync(saveFileName, JSON.stringify(updatedData, null, 2));
  } catch (error) {
    console.error(`Error writing file ${saveFileName}:`, error);
    return;
  }
}

client.on("message", async (message) => {
  sender = message.from;


  let meetingSheduleJson = fs.readFileSync("./meetingShedule.json", "utf8");
  let ms = JSON.parse(meetingSheduleJson);

  if (
    message.body.startsWith(".start ") ||
    message.body.startsWith(".Start ")
  ) {
    if (message.body.search("https://") >= 0 && !ms.currentStatus.status) {
      //Updating about status of the meeting starting.
      ms.currentStatus.status = true;
      ms.currentStatus.name = fileName;
      ms.currentStatus.msgFrom = message.from;
      updateFile(ms);

      msg = message.body.split(" ");
      meetingDetails = msg[2].split("/j/")[1].split("?pwd=");
      console.log(meetingDetails);

      startRecording(meetingDetails[0], meetingDetails[1], userNameForZoom, msg[1], ms);
    } else if (!ms.currentStatus.status) {
      //Updating about status of the meeting starting.
      ms.currentStatus.status = true;
      ms.currentStatus.name = fileName;
      ms.currentStatus.msgFrom = message.from;
      updateFile(ms);

      const meetingIdnPWD = message.body.split(" ");

      startRecording(
        meetingIdnPWD[2],
        meetingIdnPWD[3],
        userNameForZoom,
        meetingIdnPWD[1],
        ms
      );
    } else {
      client.sendMessage(
        sender,
        `Sorry, Recording Starting failed\n${ms.currentStatus.name} recording in progress...`
      );
    }
  } else if (message.body == ".stop" || message.body == ".Stop") {
    try {
      let meetingSheduleJson = fs.readFileSync("./meetingShedule.json", "utf8");
      let ms = JSON.parse(meetingSheduleJson);

      await stopRecording(ms);
    } catch (e) {
      console.log(e);
      message.reply("Error when try to -> Recording Stopped..");
    }
  } else if (message.body.search(".sh") >= 0) {
    try {
      scheduleMessage = message.body.split(" ");

      let priority = scheduleMessage[1];
      switch (priority) {
        case "1":
          priority = "one";
          break;
        case "2":
          priority = "two";
          break;
        case "3":
          priority = "three";
          break;
      }

      subName = scheduleMessage[2];

      console.log(scheduleMessage.length);

      if (scheduleMessage.length == 7) {
        ms[priority] = {
          Date: `${scheduleMessage[3]}`,
          Time: `${scheduleMessage[4]}`,
          Name: `${subName}`,
          Id: `${scheduleMessage[5]}`,
          code: `${scheduleMessage[6]}`,
        };
        updateFile(ms);
      } else if (scheduleMessage.length == 6) {
        meetingDetails = scheduleMessage[5].split("/j/")[1].split("?pwd=");

        ms[priority] = {
          Date: `${scheduleMessage[2]}`,
          Time: `${scheduleMessage[3]}`,
          Name: `${scheduleMessage[4]}`,
          Id: `${meetingDetails[0]}`,
          code: `${meetingDetails[1]}`,
        };

        updateFile(ms);
        console.log(message.from, "Record Success!");
      }
    } catch (error) {
      console.log(error);
      client.sendMessage(admin_number, `${Json.stringify(error)}`);
      client.sendMessage(message.from, "Unknown error");
    }
  } else if (message.body.toUpperCase().search("HELP") >= 0) {
    client.sendMessage(
      message.from,
      `*To start meeting:*
        .start subjectShortName meetingLink or
        .start subjectShortName meetingId meetingPassCode

*To stop meeting:*
        .stop
      
*To Shedule Meeting:*
        .sh Priority(1 2 3) subjectShortName Date(ex: 14) Time(ex: 18:30) meetingInviteLink  or
        .sh Priority(1 2 3) subjectShortName Date(ex: 14) Time(ex: 18:30) meetingID meetingPassCode
        (Time should be in 24 hour format)
      
*To see scheduled meetings list:*
        .show `
    );

    client.sendMessage(
      message.from,
      `*Subject short names for Year IV Sem VII:*
    IPDRP - Integrative Product Design and Research Project
    CS---- Control Systems
    CIM--- Computer Integrated Manufacturing
    BS---- Building Services
    PM---- Production Management
    EM---- Environment Management
    MAT--- Modern Automotive Technology
    HM1--- Humanities Module 1`
    );




  }
});



client.initialize();
