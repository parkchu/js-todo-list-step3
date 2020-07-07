const APIURL = "https://blackcoffee-todolist.df.r.appspot.com/api/"
const $addTeamButton = document.querySelector('#add-team-button')
const $teamListDiv = document.querySelector('.team-list-container')
let teamList = []
let size = parseInt($teamListDiv.querySelectorAll("div").length)

function drawTeam() {
  teamList.forEach(function(team){
    drawUiTeam(team)
  })
}

function drawUiTeam(team) {
  const div = document.createElement("div")
  const teamUI = `
  <div class="team-card-container">
    <a href="file:///D:/js-workspace/js-todo-list-step3/kanban.html?id=${team._id}" class="card" title=${getTeamMembers(team)}>
      <div class="card-title">
        ${team.name}
      </div>
    </a>
  </div>
  `
  div.innerHTML = teamUI
  $teamListDiv.insertBefore(div, $teamListDiv.childNodes[size])
  size += 1
}

function getTeamMembers(team) {
  let memberList = ""
  team.members.forEach(function(member){
    memberList += member.name + " "
  })
  return memberList
}

async function loadTeam() {
  const teams = await fetch(`${APIURL}/teams`)
  .then(function(res){
    return res.json()
  }).then(function(teams){
    return teams
  })
  return teams
}

async function addTeam(teamName) {
  const team = await fetch(`${APIURL}/teams`, {
    method: "POST",
    headers: {
      'content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      name: teamName
    })
  }).then(function(res){
    return res.json()
  }).then(function(team){
    return team
  })
  return team
}

async function clickAddTeam(event){
  const result = prompt("팀 이름을 입력해주세요")
  team = await addTeam(result)
  drawUiTeam(team)
}

async function init() {
  teamList = await loadTeam()
  $addTeamButton.addEventListener('click', clickAddTeam)
  drawTeam()
}

init()