const { TeamController } = require("../http/controllers/team.controller");
const { checkLogin } = require("../http/middlewares/autoLogin");
const { expressValidatorMapper } = require("../http/middlewares/checkErrors");
const { createTeamValidator, userValidatorToInviteTeam, teamValidatorFromInviteUser } = require("../http/validations/team");

const router = require("express").Router();

router.post("/create" , checkLogin , createTeamValidator(), expressValidatorMapper , TeamController.createTeam)
router.post("/invite/:teamID/:username" ,checkLogin , teamValidatorFromInviteUser() , userValidatorToInviteTeam() , expressValidatorMapper , TeamController.inviteUsertoTeam)
router.get("/myteam/me" ,checkLogin ,  TeamController.getMyTeams)
router.get("/list" , checkLogin , TeamController.getAllTeams);

module.exports = {
    teamRouter : router
}