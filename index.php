<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>hodgek-py Portfolio</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link href="https://fonts.cdnfonts.com/css/games" rel="stylesheet">
    <link href="./css/index.css" rel="stylesheet" type="text/css">
    <link href="https://cdn.jsdelivr.net/npm/vuetify@3.6.13/dist/vuetify.min.css" rel="stylesheet">
    <link href="https://fonts.cdnfonts.com/css/public-pixel" rel="stylesheet">

</head>
<body>

<div id="app" style="min-height: 100vh;background-color: #121212; color:white;">

    <v-container class="d-flex align-items-center" fluid style="background-color: #333333; min-height: 100vh;">
        <v-container>

        <v-row justify="center" align-items="center" class="ga-8" >
            <v-col align="center" justify="evenly" class="border-md rounded" cols="2" style="min-height: 80vh;background-color: #555555;">
                <h1 id="title" style="font-family: 'Public Pixel', sans-serif; font-size: 1.5vw; padding-bottom: 3%;">PixelArk</h1>
                <input id="color1" style="display: flex;" class="w-100" type="color" value="#ffffff" />
                <label class="pb-2" for="color1"><i>Background Color</i></label>

                <input id="color2" style="display: flex;" class="w-100" type="color" />
                <label class="pb-2" for="color2"><i>Main Color</i></label>

                    <v-text-field id="width-val" v-model="textFieldValue" label="Width"></v-text-field>

                    <v-text-field id="height-val" v-model="textFieldValue2" label="Height"></v-text-field>

                <v-btn v-on:click="lightOn = !lightOn" id="gridOff" class="d-flex mb-3" variant="tonal">
                    <div v-if="lightOn">Grid Off</div>
                    <div v-else>Grid On</div>
                </v-btn>

                <v-btn class="d-flex mb-3" variant="tonal">
                    Export
                </v-btn>

                <v-switch id="switcher" v-on:click="eraseText" color="primary" class="d-flex mb-3" label="Erase" variant="tonal">
                    Erase
                </v-switch>

                <v-btn v-on:click="clearText" class="d-flex" variant="tonal">
                    Clear
                </v-btn>



            </v-col>

            <v-col class="border-md rounded" cols="9" style="background-color: #555555;">
                <div id="gridLeader" style="height: 90vh; display: grid;background-color: white;">





                </div>
            </v-col>


        </v-row>


        </v-container>


    </v-container>





</div>



<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
<script
    src="https://unpkg.com/vue@3/dist/vue.global.js">
</script>
<script src="https://cdn.jsdelivr.net/npm/vuetify@3.6.13/dist/vuetify.min.js"></script>
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
</body>



</html>
<script>

    $(document).ready(function(){


    const { createApp } = Vue
    const { createVuetify } = Vuetify
    const vuetify = createVuetify()

    const app = Vue.createApp({
        data() {
            return {
                textFieldValue: 24,
                textFieldValue2: 24,
                lightOn: true,
                erase: false
            }
        },
        methods: {
            clearText() {
                $(".gridKid").css("background-color","transparent");
            },
            eraseText(){
                this.erase = !this.erase
                if(this.erase){
                    color = "transparent"
                }
                else{
                    color = $("#color2").val();
                }
            }
        }
    })

    app.use(vuetify).mount('#app')

        tmp = "#000000"
        background = "#ffffff"
        color = "#000000"
        rows = 24
        columns = 23
        light = true

        for(i = 1; i <= 24; i++){
            for(j = 1; j <= 24; j++) {
                $("#gridLeader").append(`<div draggable="false" class="gridKid" style='border: 1px solid black; grid-column: ${i}; grid-row: ${j};'></div>`)
            }
        }

        $(document).on("click", ".gridKid", function (e){
            $(this).css("background-color", color);
        })

        $("#color1").on("change", function (){
            background = $("#color1").val();
            $("#gridLeader").css("background-color",background);
        })

        $("#color2").on("change", function (){
            if (color == "transparent"){

            }
            else{
                color = $("#color2").val();
            }

        })

        $("#width-val").on("focusout", function (){
            columns = $("#width-val").val();
            $("#gridLeader").html("");

            for(i = 1; i <= rows; i++){
                for(j = 1; j <= columns; j++) {
                    $("#gridLeader").append(`<div draggable="false" class="gridKid" style='border: 1px solid black; grid-column: ${i}; grid-row: ${j};'></div>`)
                }
            }

        })

        $("#height-val").on("focusout", function (){

            rows = $("#height-val").val();
            $("#gridLeader").html("");

            for(i = 1; i <= rows; i++){
                for(j = 1; j <= columns; j++) {
                    $("#gridLeader").append(`<div draggable="false" class="gridKid" style='border: 1px solid black; grid-column: ${i}; grid-row: ${j};'></div>`)
                }
            }

        })

        $("#gridOff").on("click",function (){
            if(light){
                $(".gridKid").css("border","none");
                light = false
            }
            else{
                $(".gridKid").css("border","1px solid black");
                light = true
            }


        })


    });




</script>
