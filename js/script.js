$(document).ready(function(){


    const { createApp } = Vue
    const { createVuetify } = Vuetify
    const vuetify = createVuetify()

    const app = Vue.createApp({
        data() {
            return {
                textFieldValue: 24,
                textFieldValue2: 24,
                canvasHei: 500,
                canvasWid: 500,
                lightOn: true,
                erase: false,
                toggle: null,
                zoomNumber: 1,
                mode: true,
                label1: "Draw",
                transparentGridW: 20,
                transparentGridH: 20
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
                this.zoomNumber = 1;
                $("#gridLeader").css("zoom", this.zoomNumber);
                $("#gridLeader").css("border", "none");
                domtoimage.toPng(document.getElementById('gridLeader'))
                    .then(function (dataUrl) {
                        $("#gridLeader").css("border", "none");
                        var img = new Image();
                        img.src = dataUrl;
                        var link = document.createElement('a');
                        link.download = 'my-image-name.png';
                        link.href = img.src;
                        link.click();
                        $("#gridLeader").css("border", ".01px solid black");
                    })
                    .catch(function (error) {
                        console.error('oops, something went wrong!', error);
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
                },

            zoomIn() {
                this.zoomNumber = parseFloat($("#gridLeader").css("zoom")) + 0.1
                $("#gridLeader").css("zoom", `${this.zoomNumber}`);
            },

            zoomOut() {
                this.zoomNumber = parseFloat($("#gridLeader").css("zoom")) - 0.1
                $("#gridLeader").css("zoom", `${this.zoomNumber}`);
            },

            setWidth(e){
                $("#gridLeader").css("width", this.canvasWid);
            },

            setHeight(){
                $("#gridLeader").css("height", this.canvasHei);
            },

            transparent(){
                $("#gridLeader").css("background-color", "transparent");
            },

            changeMode(event){
                this.mode = !this.mode;
                if(this.mode){
                    $("#main-label").text("Draw");
                    $("#pixelRow").css("display", "flex");
                    $("#CombineRow").css("display", "none");
                }
                else{
                    $("#main-label").text("TileMap");
                    $("#pixelRow").css("display", "none");
                    $("#CombineRow").css("display", "flex");
                }
            },

            stickWidth(){

                if(confirm("Change width of grid?")){
                    rows = $("#stickWidth").val();
                    $("#gridFollow").html("");

                    for(i = 1; i <= rows; i++){
                        for(j = 1; j <= columns; j++) {
                            if((j+i)%2 === 0) {
                                $("#gridFollow").append(`<div draggable="false" class="gridGrandkid" style='grid-column: ${i}; grid-row: ${j}; margin:0; padding:0;'></div>`)
                            }
                            else{
                                $("#gridFollow").append(`<div draggable="false" class="gridGrandkid" style='background-color: rgba(255,255,255,.2); grid-column: ${i}; grid-row: ${j}; margin:0; padding:0;'></div>`)
                            }
                        }
                    }
                }
                else{


                }

                mouseDown = false;
            },

            stickHeight(){

                if(confirm("Change width of grid?")){
                    columns = $("#stickHeight").val();
                    $("#gridFollow").html("");

                    for(i = 1; i <= rows; i++){
                        for(j = 1; j <= columns; j++) {
                            if((j+i)%2 === 0) {
                                $("#gridFollow").append(`<div draggable="false" class="gridGrandkid" style='grid-column: ${i}; grid-row: ${j}; margin:0; padding:0;'></div>`)
                            }
                            else{
                                $("#gridFollow").append(`<div draggable="false" class="gridGrandkid" style='background-color: rgba(255,255,255,.2); grid-column: ${i}; grid-row: ${j}; margin:0; padding:0;'></div>`)
                            }
                        }
                    }
                }
                else{


                }

                mouseDown = false;
            },

            clickUpload(){
                document.getElementById('fileImg').click();
            },

            uploadImg() {
                var myFile = $('#fileImg').prop('files');
                if(myFile.length > 0){
                    var reader = new FileReader();

                    reader.addEventListener("load", e => {
                        //console.log(reader.result);
                        $("#gridImg").append(`<div class="div-img" style="display: flex; align-items: center;">
                <img style="object-fit: contain;"  src="${reader.result}">

                </div>`);
                    });

                    reader.readAsDataURL(myFile[0])
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
    imgSelect = ""

    for(i = 1; i <= 24; i++){
        for(j = 1; j <= 24; j++) {
            $("#gridLeader").append(`<div draggable="false" class="gridKid" style='border: .01px solid black; grid-column: ${i}; grid-row: ${j};'></div>`)
        }
    }


    for(i = 1; i <= 20; i++){
        for(j = 1; j <= 20; j++) {
            if((j+i)%2 === 0) {
                $("#gridFollow").append(`<div draggable="false" class="gridGrandkid" style='grid-column: ${i}; grid-row: ${j}; margin:0; padding:0;'></div>`)
            }
            else{
                $("#gridFollow").append(`<div draggable="false" class="gridGrandkid" style='background-color: rgba(255,255,255,.2); grid-column: ${i}; grid-row: ${j}; margin:0; padding:0;'></div>`)
            }

        }
    }



    var mouseDown = false;

    $(document).on("mouseenter", ".gridKid", function (e){
        if(mouseDown) {
            e.preventDefault()
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
        e.preventDefault()
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
                    $("#gridLeader").append(`<div draggable="false" class="gridKid" style='border: .01px solid black; grid-column: ${i}; grid-row: ${j};'></div>`)
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
                    $("#gridLeader").append(`<div draggable="false" class="gridKid" style='border: .01px solid black; grid-column: ${i}; grid-row: ${j};'></div>`)
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
            $(".gridKid").css("border",".01px solid black");
            light = !light
        }


    })

    $("#gridOff2").on("click",function (){
        if(light){
            $(".gridKid").css("border","none");
            light = !light
        }
        else{
            $(".gridKid").css("border",".01px solid black");
            light = !light
        }


    })

    $("#main-col").on("mousewheel", function (e){
        if(e.originalEvent.wheelDelta /120 > 0) {
            e.preventDefault();
            zoom = $("#gridLeader").css("zoom");
            if(e.ctrlKey){
                zoom = parseFloat(zoom) + .1;
                $("#gridLeader").css("zoom", `${zoom}`);
            }
        }
        else{
            e.preventDefault();
            zoom = $("#gridLeader").css("zoom");
            if(e.ctrlKey){
                zoom = parseFloat(zoom) - .1;
                $("#gridLeader").css("zoom", `${zoom}`);
            }
        }

    })





    // Start of title map script

    $(document).on("click",".div-img", function(){
        $(".div-img").css("background-color", "transparent")
        $(this).css("background-color", "blue");
        imgSelect = $(this).children()[0]
        imgSelect = $(imgSelect).attr('src');
        console.log(imgSelect);
    })

    $(".gridGrandkid").on("mousedown", function(){
        $(this).css("background-image",`url(${imgSelect})`);
        console.log($(this).css("background-image"));
    })



});


