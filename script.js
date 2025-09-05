const loadlessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json()) // promise of JSON data
    .then((json) => displayLesson(json.data));
};

const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelDetail = async (id) =>{
  const url=`https://openapi.programming-hero.com/api/word/${id}`;
 
  const res = await fetch(url);
  const details=await res.json();
  displayWordDetails(details.data)

};
const displayWordDetails=(word)=>{
console.log(word)
const detailsBox=document.getElementById("details-container")
detailsBox.innerHTML=`<div class="">
        <h2 class="text-2xl font-bold">${word.word} ( <i class="fa-solid fa-microphone-lines"></i>    :${word.pronunciation})</h2>
      </div>
      <div class="">
        <h2 class="font-bold">Meaning</h2>
        <p>${word.meaning}</p>
      </div>
      <div class="">
        <h2 class="font-bold">Example</h2>
        <p>${word.sentence}</p>
      </div>
      <div class="">
        <h2 class="font-bold">synonym</h2>
        <span class="btn">syn1</span>
        <span class="btn">syn1</span>
        <span class="btn">syn1</span>
      </div>
      
      `;
document.getElementById("word_modal").showModal();
}


const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive(); //remove all active class 
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
        clickBtn.classList.add("active") //add active class
      
      displayLevelWord(data.data)
    });
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length == 0) {
    wordContainer.innerHTML = `<div class="font-bangla col-span-full text-center rounded-xl py-10  space-y-5 ">
       
    <img class="mx-auto" src="./assets/alert-error.png" alt="">
    <p class="font-sm  text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="font-bold text-3xl">নেক্সট Lesson এ যান</h2>
      </div>`;
    return;
  }

  words.forEach((word) => {
    console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `
  <div class="bg-white rounded-xl shadow-sm text-center py-20 px-5 space-y-4">
        <h2 class="font-bold text-2xl">${word.word ? word.word : "No Word Found"}</h2>
        <p class="font-semibold">Meaning/pronounciation</p>

        <div class="font-bangla font-medium text-2xl">"${word.meaning ? word.meaning : "No Meaning Found"} / ${word.pronunciation ? word.pronunciation : "No Pronunciation Found" }"</div>
        <div class="flex justify-between items-center">
          <button  class="btn bg-[#1A91FF20] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
          <button onclick="loadLevelDetail(${word.id})" class="btn bg-[#1A91FF20] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
        </div>
        </div>

  `;
    wordContainer.append(card);
  });
};

const displayLesson = (lessons) => {
  // 1. get the container and empty
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  // 2. loop through every lesson
  for (let lesson of lessons) {
    // 3. create element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
      <button  id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})
      "class="btn btn-outline btn-primary lesson-btn">
        <i class="fa-solid fa-book-open"></i>Lesson -${lesson.level_no}
      </button>
    `;

    // 4. append into container
    levelContainer.append(btnDiv); // appendChild better for single element
  }
};

loadlessons();
