import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import iCalendarPlugin from '@fullcalendar/icalendar'

require('bootstrap');

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // webpack uses file-loader to handle font files
import './index.css';


let calendar: Calendar;
let spinner: HTMLElement;
let errorElement: HTMLElement;
let fileList: HTMLElement;

document.getElementById("fileInput")?.addEventListener('change', (event: Event) => {
  const target = event.target as HTMLInputElement;

  if (!target.files || target.files.length == 0) return;

  calendar.removeAllEventSources();
  clearListElements();

  enableSpinner();
  hideLoadingError();

  let readers: Promise<void>[] = [];
  for (let index = 0; index < target.files.length; index++) {
    const file = target.files.item(index);
    const colors = getColors(index);

    //Add file to fileList
    addFile(file!.name, colors[0], colors[1]);
    readers.push(readFileAsDataUrl(file!)
      .then(data => addToCalendar(data, colors[0], colors[1])));
  }

  Promise.all(readers).catch(showLoadingError)
    .finally(disableSpinner);
})


function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise(function (resolve, reject) {
    let fr = new FileReader();

    fr.onload = function () {
      resolve(fr.result as string);
    };

    fr.onerror = function () {
      reject(fr);
    };

    fr.readAsDataURL(file);
  });
}

function addToCalendar(dataUrl: string, backgroundColor: string, textColor: string): Promise<void> {
  return new Promise(function (resolve, reject) {
    const input = {
      url: dataUrl,
      format: 'ics',
      color: backgroundColor,
      textColor: textColor,
    };
    calendar.addEventSource(input);

    resolve();
  });
}



function enableSpinner() {
  if (spinner.classList.contains('show')) return;
  spinner.classList.add('show');
}

function disableSpinner() {
  if (spinner.classList.contains('show')) {
    spinner.classList.remove('show');
  }
}

function showLoadingError() {
  if (errorElement.classList.contains('show')) return;
  errorElement.classList.add('show');
}

function hideLoadingError() {
  if (errorElement.classList.contains('show')) errorElement.classList.remove('show');
}

function addFile(fileName: string, backgroundColor: string, textColor: string) {
  fileList.insertAdjacentHTML('beforeend', `<div class="rounded" style="background-color: ${backgroundColor}; color: ${textColor};">${fileName}</div>`);
}

function clearListElements() {
  while (fileList.hasChildNodes()) {
    fileList.removeChild(fileList.firstChild!);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendar')!;
  spinner = document.getElementById('spinner')!;
  errorElement = document.getElementById('errorText')!;
  fileList = document.getElementById('fileList')!;

  calendar = new Calendar(calendarEl, {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin, bootstrap5Plugin, iCalendarPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    },
    themeSystem: 'bootstrap5',
    navLinks: true,
    dayMaxEvents: true,
  });

  calendar.render();
});

function getColors(index: number): string[] {
  const hue = index * 137.508; // use golden angle approximation // Copied from https://stackoverflow.com/a/20129594/13231742
  const rgb = hsl2rgb(hue, 0.75, 0.75);

  let textColor: string;

  if (colourIsLight(rgb[0], rgb[1], rgb[2])) {
    textColor = "black";
  } else {
    textColor = "white";
  }

  return [`hsl(${hue},75%,75%)`, textColor];
}

function hsl2rgb(h: number, s: number, l: number): number[] { // Copied from https://stackoverflow.com/a/54014428/13231742
  let a = s * Math.min(l, 1 - l);
  let f = (n: number, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  return [f(0) * 255, f(8) * 255, f(4) * 255];
}

var colourIsLight = function (r: number, g: number, b: number) { // Copied from https://codepen.io/WebSeed/full/pvgqEq/

  // Counting the perceptive luminance
  // human eye favors green color... 
  var a = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return (a < 0.5);
}