let questions = [{
    "id": 1,
    "question":"asd asd asd asd asdasd asdas asdasdsadas asd Dsd as?",
    "option_1":"asdsadasd asd",
    "option_2":"asdsadasd asd",
    "option_3":"asdsadasd asd",
    "option_4":"asdsadasd asd",
},{
    "id": 2,
    "question":"asd asd asd asd asdasd asdas asdasdsadas asd Dsd as?",
    "option_1":"asdsadasd asd",
    "option_2":"asdsadasd asd",
    "option_3":"asdsadasd asd",
    "option_4":"asdsadasd asd",
},
{
    "id": 3,
    "question":"asd asd asd asd asdasd asdas asdasdsadas asd Dsd as?",
    "option_1":"asdsadasd asd",
    "option_2":"asdsadasd asd",
    "option_3":"asdsadasd asd",
    "option_4":"asdsadasd asd",
},
{
    "id": 4,
    "question":"asd asd asd asd asdasd asdas asdasdsadas asd Dsd as?",
    "option_1":"asdsadasd asd",
    "option_2":"asdsadasd asd",
    "option_3":"asdsadasd asd",
    "option_4":"asdsadasd asd",
},
{
    "id": 5,
    "question":"asd asd asd asd asdasd asdas asdasdsadas asd Dsd as?",
    "option_1":"asdsadasd asd",
    "option_2":"asdsadasd asd",
    "option_3":"asdsadasd asd",
    "option_4":"asdsadasd asd",
},

]

function renderQuizQuestions(questions){
    var no = -1;
    let questionsHTML = questions.map(qtn => {
        no  += 1;
        return (`
            <div class="qus-contain">
            <input type="hidden" name="qtn[${no}][id]" value=${qtn.id} />
            <div class="qus">
                <div class="qus-no">${no+1}</div>
                <div class="question-text">${qtn.question}
                </div>
            </div>
            <div class="option-container">
                <label class="option">
                    <input type="radio" value="0" name="qtn[${no}][selected]"></input>
                    <span class="check">${qtn.option_a}</span>
                </label>
                <label class="option">
                    <input type="radio" value="1" name="qtn[${no}][selected]"></input>
                    <span class="check">${qtn.option_b}</span>
                </label>
                <label class="option">
                    <input type="radio" value="2" name="qtn[${no}][selected]"></input>
                    <span class="check">${qtn.option_c}</span>
                </label> <label class="option">
                    <input type="radio" value="3"  name="qtn[${no}][selected]"></input>
                    <span class="check">${qtn.option_d}</span>
                </label>
            </div>
        </div>`
        );
    })
    let quesContainer = document.getElementById("question_container");
    quesContainer.innerHTML = questionsHTML;
}

window.onload = ()=>{
    let questions = fetch("/quiz/getAllQuestions", { method: 'GET', headers:{   
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }}).then(res => res.json())
    .then(questions=>{
        renderQuizQuestions(questions);
    }).catch(err=>console.error(err));
};

function submit(){
    let form = document.forms[0];
    form.submit();
}