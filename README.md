# MunchkinCharSheet

Personal project to facilitate the playability of the board game Munchkin without using the official app.  
This application allows the creation of characters for a Munchkin session and the modification of races, classes, sex, level and strength bonuses throughout the game.  
The leveling is entirely handled by the players which permits a bit of cheating by "accidentaly" forgetting to give a level for example...

## Objectives
+ Creation of a fast and easy to use application for everyone.
+ Allowing the creation, deletion or modification of any character whenever the player wants.
+ Sorting the characters following several criterias : creation date, level or total strength.
+ Being able to reset the game quickly by pressing a single button but without triggering it by accident.

## Technologies
+ Vue js
+ Outil de SSR : Framework Quasar
+ State and Store : Vuex

## Access
The application is hosted on netlify at https://munchkincharsheet.netlify.app/

## Getting the app without the website
1. Clone the repository with ``git clone https://github.com/Valxer/MunchkinCharSheet.git``
2. Open the repository with VSCode
3. Open a terminal in VSCode :  
	* Type ``cd Munchkin && npm install`` to install all the dependencies
	* Type ``quasar dev`` to launch the app. The windiw should self-open. Otherwise the console should give you the URL under the section "App URL" (by default http://localhost:8080/)
4. Enjoy your games and don't forget to cheat A LOT !
    
