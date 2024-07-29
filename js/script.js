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
                erase: false,
                toggle: null
            }
        },
        methods: {
            clearText() {
                if(confirm("Are you sure you want to clear this sheet?")) {
                    $(".gridKid").css("background-color", "transparent");
                }
            },
            eraseText(){
                this.erase = !this.erase
                if(this.erase){
                    color = "transparent"
                }
                else{
                    color = $("#color2").val();
                }
            },
            downloadPNG(){
                domtoimage.toJpeg(document.getElementById('gridLeader'), { quality: 0.95 })
                    .then(function (dataUrl) {
                        var link = document.createElement('a');
                        link.download = 'my-image-name.jpeg';
                        link.href = dataUrl;
                        link.click();
                    });
            },
            colorGrab(){
                colorgrab = !colorgrab;
            },
            saveProject(){
                var data = JSON.stringify($("#gridLeader").html())
                var a = document.createElement("a");
                var file = new Blob([data], {type: "application/json"});
                a.href = URL.createObjectURL(file);
                a.download = "project";
                a.click();
            },

            importProject(){
                document.getElementById('fileid').click();

            },

            fileHandle(){
                var myFile = $('#fileid').prop('files');
                if(myFile.length > 0){
                $("#gridLeader").html("");
                var reader = new FileReader();

                reader.addEventListener("load", e => {
                    console.log(e.target.result, JSON.parse(reader.result))
                    $("#gridLeader").html(JSON.parse(reader.result));
                });

                reader.readAsText(myFile[0])
            }
                }
        }
    })

    app.use(vuetify).mount('#app')

    tmp = "#000000"
    background = "#ffffff"
    color = "#000000"
    rows = 24
    columns = 24
    light = true
    colorgrab = false

    for(i = 1; i <= 24; i++){
        for(j = 1; j <= 24; j++) {
            $("#gridLeader").append(`<div draggable="false" class="gridKid" style='border: 1px solid black; grid-column: ${i}; grid-row: ${j};'></div>`)
        }
    }

    var mouseDown = false;

    $(document).on("mouseenter", ".gridKid", function (e){
        if(mouseDown) {
            if (colorgrab === true) {
                const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`
                color = rgb2hex($(this).css("background-color"));
                $("#color2").val(color);
            } else {
                $(this).css("background-color", color);
            }
        }

        })

    $(document).on("mouseup", function (e){
        mouseDown = false
    })

    $(document).on("dragstart", function (e){
        mouseDown = false
    })

    $(document).on("mousedown", ".gridKid", function (e) {
        mouseDown = true
        if (colorgrab === true) {
            const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`
            color = rgb2hex($(this).css("background-color"));
            $("#color2").val(color);
        } else {
            $(this).css("background-color", color);
        }
    });



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

    $("#width-val").on("change", function (){

        if(confirm("Change width of grid?")){
            rows = $("#width-val").val();
            $("#gridLeader").html("");

            for(i = 1; i <= rows; i++){
                for(j = 1; j <= columns; j++) {
                    $("#gridLeader").append(`<div draggable="false" class="gridKid" style='border: 1px solid black; grid-column: ${i}; grid-row: ${j};'></div>`)
                }
            }
        }
        else{


        }

        mouseDown = false;
    })

    $("#height-val").on("change", function (){
        if(confirm("Change height of grid?")) {
            columns = $("#height-val").val();
            $("#gridLeader").html("");

            for(i = 1; i <= rows; i++){
                for(j = 1; j <= columns; j++) {
                    $("#gridLeader").append(`<div draggable="false" class="gridKid" style='border: 1px solid black; grid-column: ${i}; grid-row: ${j};'></div>`)
                }
            }
        }

        mouseDown = false;

    })

    $("#gridOff").on("click",function (){
        if(light){
            $(".gridKid").css("border","none");
            light = !light
        }
        else{
            $(".gridKid").css("border","1px solid black");
            light = !light
        }


    })



});

