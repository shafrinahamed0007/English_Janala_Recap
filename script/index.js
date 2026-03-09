const loadData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/levels/all",
  );
  const data = await res.json();
  displayLessons(data.data);
};

const removeActive = () => {
  const removeActiveClr = document.querySelectorAll(".removePurle");
  removeActiveClr.forEach((btn) => btn.classList.remove("active"));
};

const displayLessons = async (lessons) => {
  const levelContainer = document.getElementById("levelContainer");
  levelContainer.innerHTML = "";

  for (let lesson of lessons) {
    const levelDiv = document.createElement("div");
    levelDiv.innerHTML = `
    <button
    id = "lessonBtn-${lesson.level_no}"
       
    onclick = "loadLevelWord(${lesson.level_no})"
                    class="btn btn-outline btn-primary cursor-pointer hover:bg-transparent hover:text-primary hover:border-primary removePurle "><i
                        class="fa-solid fa-book-open" style="color: rgb(66, 42, 213);"></i> Learn - ${lesson.level_no}</button>`;

    levelContainer.append(levelDiv);
  }
};

const loadLevelWord = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/level/${id}`,
  );
  removeActive();
  const data = await res.json();

  const clickBtn = document.getElementById(`lessonBtn-${id}`);
  clickBtn.classList.add("active");
  displayLevelWord(data.data);
};

// };

const displayLevelWord = async (data) => {
  // console.log(data)
  const wordContainer = document.getElementById("wordContainer");
  wordContainer.innerHTML = "";
  if (data.length == 0) {
    wordContainer.innerHTML = `
      
            <div class="text-center col-span-full rounded-xl py-10 space-y-6 fontBangla">
            <img class  = "mx-auto" src = "./assets/alert-error.png" />
                <p class=" font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h2 class="font-bold text-3xl">নেক্সট Lesson এ যান</h2>
            </div>
    `;
  }

  data.forEach((info) => {
    const wordDiv = document.createElement("div");
    wordDiv.innerHTML = `
      <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5">
                <h2>${info.word ? info.word : "No word found"}</h2>
                <p>Meaning / Pronounciation</p>
                <div>
                    <h2 class="fontBangla">"${info.meaning ? info.meaning : "No meaning found"}" / "${info.pronunciation ? info.pronunciation : "No pronounciation"}"</h2>
                </div>


            </div>
    `;
    wordContainer.append(wordDiv);
  });
};

loadData();
