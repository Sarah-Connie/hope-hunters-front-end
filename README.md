# Hope Helpers Front End

#### Connie Jacques and Sarah Landis

### Deployed Versions:
#### [Front End Demo]()
#### [Back End Demo]()

### Repositories:
#### [Front End Repository](https://github.com/Sarah-Connie/hope-hunters-front-end)
#### [Back End Repository](https://github.com/Sarah-Connie/hope-hunters-back-end)

### Project Management: 
#### [Project Planning](https://trello.com/b/7NMGHoN7/full-stack-app)
#### [Source Control Front End](https://github.com/Sarah-Connie/hope-hunters-front-end/branches)
#### [Source Control Back End](https://github.com/Sarah-Connie/hope-hunters-back-end/branches)

### Documentation:
#### [Preliminary Documentation (Part A)]()
____

### UX/UI Modifications:
This project strongly adheres to the preplanning documentation except for some minor changes. Please see below UX/UI nuances and respective reasoning for the modifications.

#### Site name
One major deviation from the original planning stage is the site name. 'Hope Hunters' was the initial site name however after going thru the rest of the planning stages including user stories, color schema, etc., it was deemed that the word 'hunters' was not conveying an appropriate message to people affected by a missing person. 

Synonyms to the word 'hunter' include stalker, kill, and predator amongst other negatively geared words. This site is intended to help those who are affected by missing persons and help the community. Using the word 'hunters' could cause further trauma to an already delicate user. Therefore, it was a natural transition from Hope Hunters to Hope Helpers, as the goal of the site is to help those affected in some way and gain the support and further awareness of the community.

#### Logo
The logo was also created after preliminary planning had completed, and was not specified or designed in the preplanning stage of this application. The logo was intended to play off the site name in a positive way, and eventually evolved to feature the two H's of Hope Helpers in shape of ladders and resembling the interconnectivity of hands, as shown below. ![intertwined hands](./src/assets/images/hands.jpg) This was an intentional design meant to signify an upward motion (climbing a ladder) congruent to the word 'hope' and 'helpers'. Lastly in the logo, a thin semicircle runs through the ladders, signifying a hill or a sun, also aiding in the message of a rising motion, being at the top, or in essence, reinvigorating hope and seeing light at the end of a tunnel. 

Please see a large version of the purposefully designed logo for the Hope Helpers site below.
>
![logo](./src/assets/images/logo.png)

#### Layout

- ##### Dashboard
    >
    - Desktop
        >
        Original Prototype:
        >
        ![desktop proto](./src/assets/images/desktop-dash-proto.png)
        >
        Once in the process of developing, the original design for the dashboard on larger screens, specifically the 'Active Reports' section, became too cramped and busy. In order to preserve visual importance and clarity for the user, the design was modified to feature a single column of reports rather than two columns. 
        >
        In making this modification, the images and related missing person information remain at a size promoting readability for users of all ages to better understand visually. The layout is neater and more succinct in directing the user to the intended action whilst remaining neat.
        >
        Please see below for the final layout.
        >
        ![dash final](./src/assets/images/dash-final.png)
        > 
        The header navigation links were also modified to render a link back to home `/` when not on the `/` route for navigational convenience.
        > 
    - Mobile 
        >
        The position of the searchbar and 'File New Report' form were also slightly changed. This was due to the fact that the buttons for forms are connected, meaning when one button is clicked, the others are manipulated to show whatever text to access whatever form is not displayed.
        >
        ![mobile dash proto](./src/assets/images/mobile-dash-proto.png)
        >
        Rather than position them side by side, continuity was chosen between the main page and the dashboard, in terms of the layout. On the dashboard, the searchbar is conditionally rendered if the user has more than 4 reports, or if they're admin/police users. A layout that suited when the searchbar wasn't rendered without leaving a gaping space in the UI was required.
        >
        It was also important that the search bar input was no cut off, so it was moved to sit under the 'File New Report' button whose position is static regardless of the searchbar rendering.
        >
         ![mobile dash final](./src/assets/images/mobile-dash-final.png)
        >
        Lastly, for the mobile dashboard, no form is rendered on mount in order to allow the user to view the full UI and reports prior to opening up a report form. The report form sits in the planned location, under the 'File New Report' button/searchbar and above the active reports on file.
