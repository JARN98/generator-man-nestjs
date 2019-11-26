var Generator = require('yeoman-generator');
const _ = require('lodash');
const extend = _.merge;

module.exports = class extends Generator {
  initializing() { }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "Your project name",
        default: this.appname // Default to current folder name
      },
      // {
      //   type: "confirm",
      //   name: "cool",
      //   message: "Would you like to enable the Cool feature?"
      // },
      // {
      //   type: 'list',
      //   name: 'features',
      //   message: 'What do you want to make today?',
      //   choices: ["Jumbo", "Large", "Standard", "Medium", "Small"]
      // }
    ]);

    this.log("app name", this.answers.name);
    // this.log("cool feature", this.answers.cool);
    // this.log("choise feature", this.answers.features);

  }

  async writing() {

    await this.fs.copyTpl(this.templatePath(`jwt-roles`), this.destinationPath(`${this.answers.name}`));

    const currentPkg = await this.fs.readJSON(this.destinationPath(`${this.answers.name}/package.json`), {});

    const pkg = await extend(
      {
        name: this.answers.name,
        version: '0.0.1'
      },
      currentPkg
    );

    await this.fs.writeJSON(this.destinationPath(`${this.answers.name}/package.json`), pkg);
  }


  install() {
    process.chdir(`${this.answers.name}`);
    this.npmInstall();
  }
};