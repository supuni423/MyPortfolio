---
title: 'AES Glove – IoT-Based Smart Rehabilitation Wearable Glove'
summary: 'A wearable sensor-based rehabilitation device — I built the grip-strength sensing, the multiplexed sensor-acquisition system, and the real-time web dashboard for a 5-person team project.'
order: 4
date: 2025-01-01
status: 'completed'
role: 'built'
category: 'IoT / Embedded'
image: '~/assets/images/projects/aes-glove.jpg'
stack: ['ESP32-WROOM', 'FlexiForce A201 FSR', 'CD74HC4067 Multiplexer', 'DS3231 RTC', 'MAX30102', 'AD8226 EMG', 'JavaScript', 'Chart.js', 'WebSockets', 'Node.js', 'MongoDB']
---

## The Problem

Hand rehabilitation after paralysis, stroke, or nerve injury depends on consistent, guided exercise — but traditional methods rely on manual observation by a physiotherapist, which is subjective, resource-intensive, and hard to sustain at home. Patients often have no objective feedback on whether they're performing exercises correctly, and doctors have no way to track fine-grained progress without expensive clinical motion-capture equipment. The AES Glove, built by a 5-team ("Technerds") for the Microcontroller Based Applications Development module at the University of Moratuwa, was designed to move that monitoring out of the clinic and into the patient's own home.

## What I Built

The team's AES Glove is a wearable device combining seven flex sensors (finger, wrist, and elbow bending), a grip-force sensor, an EMG sensor for muscle activity, and a heart-rate/SpO₂ sensor, all read by an ESP32 microcontroller and streamed over WebSockets to a web dashboard that gives doctors live graphs and exercise history.

My part of that system spanned three areas: **grip-strength sensing**, the **multiplexed sensor-acquisition pipeline** that let a single microcontroller read eight analog sensors, and the **web dashboard** doctors and patients actually use — plus the physical 3D modeling and hardware assembly of the glove itself.

- **Grip-strength sensing**: integrated the FlexiForce A201 force-sensitive resistor via a voltage-divider circuit, and placed it behind a pliable ball in the palm of the glove so it captures overall grip pressure rather than a single pressure point.
- **Sensor-acquisition pipeline**: since the ESP32 has far fewer ADC pins than the project needed (7 flex sensors + 1 force sensor), I integrated a CD74HC4067 16-channel analog multiplexer and wrote the firmware to read all eight sensors through a single ADC pin.
- **Web dashboard**: built the doctor/patient-facing frontend — live sensor graphs over WebSocket, and a filterable history view (by date range and exercise) for tracking recovery over time.
- **3D modeling & assembly**: designed the glove's control-module enclosure in CAD, then did the hands-on soldering, cable routing, and assembly of the physical prototype.

## Tech Decisions

Rather than calibrate the grip sensor with a manual trim potentiometer, I calibrated it entirely in software: a dynamic routine tracks each user's maximum recorded grip force during use and sets that as their personal 100% baseline, with a hysteresis filter to discard noisy low readings. That makes the sensor self-adjusting per patient instead of needing a technician to re-tune it for every new user.

For the multiplexer, I wrote a `selectMuxChannel(byte channel)` function that converts a channel number into the 4-bit binary address the CD74HC4067 needs on its select pins, then looped through all eight channels each cycle with a short stabilization delay before each ADC read — a standard analog-mux pattern, but one that was necessary here specifically because the sensor count outgrew the ESP32's available ADC pins.

The dashboard's real-time graphs run on Chart.js fed by the WebSocket stream, chosen so doctors see a live line update during a session instead of a page that has to be manually refreshed.

## Challenges & Learnings

Reading eight analog sensors through one ADC pin only works if the multiplexer's channel-select timing is right — too short a stabilization delay after switching channels and the reading bleeds over from the previous sensor. Getting that delay tuned, and verifying it channel-by-channel, was a debugging step that doesn't show up in a block diagram but mattered for data quality.

I validated the full pipeline end-to-end rather than testing layers in isolation: moving a finger and watching the corresponding flex value change on the serial monitor, gripping an object and confirming the pressure reading rose, then following that same signal through Wi-Fi to the dashboard to confirm it rendered on the correct graph. That end-to-end habit caught integration issues that unit-testing the ESP32 firmware or the frontend alone wouldn't have surfaced.

## Outcome

The system worked as an integrated whole: sensor movement on the physical glove reflected live on the web dashboard within the same session, and the history view let a full exercise timeline be filtered and reviewed after the fact. My role specifically bridged the hardware and software halves of the project — from the analog signal chain through to the interface a doctor actually reads.
