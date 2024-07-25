<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>hodgek-py Portfolio</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link href="https://fonts.cdnfonts.com/css/games" rel="stylesheet">
    <link href="./css/index.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/vuetify@3.6.13/dist/vuetify.min.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@100..900&display=swap" rel="stylesheet">

</head>
<body>

<div id="app" style="min-height: 100vh;background-color: #121212; color:white;">

    <v-container fluid style="background-color: #232323; min-height: 10vh;">
        <h1 class="text-center">PixelArk</h1>

    </v-container>

    <v-container fluid style="background-color: #333333; min-height: 90vh;">
        <v-container>

        <v-row justify="center" class="ga-8">
            <v-col align="center" justify="evenly" class="border-md rounded" cols="2" style="min-height: 85vh;background-color: #555555;">
                <input id="color1" style="display: flex;" type="color" />
                <label for="color1"><i>Background Color</i></label>

                <input id="color2" style="display: flex;" type="color" />
                <label for="color2"><i>Main Color</i></label>

                    <v-text-field label="Width"></v-text-field>

                    <v-text-field label="Height"></v-text-field>

                <v-btn class="d-flex" variant="tonal">
                    Export
                </v-btn>

            </v-col>

            <v-col class="border-md rounded" cols="9" style="background-color: #555555;">
                <canvas id="paintCanvas" class="border-sm" style="height:100%;width: 100%;background-color: white;">


                </canvas>
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
</body>



</html>
<script>
    const { createApp } = Vue
    const { createVuetify } = Vuetify
    const vuetify = createVuetify()

    const app = Vue.createApp({
        data() {
            return {
                message: "Hello World!"
            }
        }
    })

    app.use(vuetify).mount('#app')

</script>
