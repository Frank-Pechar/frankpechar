hljs.highlightAll();

('use strict');

/*******************************************/
// CLASS AND OBJECT METHODS

console.log('\n');
console.log('****           CLASS AND OBJECT METHODS\n\n');
console.log('********************************************************');
console.log('***     Instance, Prototype, and Static Methods');
console.log('********************************************************');

/*************** Person Class ***************/

class Person {
  constructor(firstName) {
    this.firstName = firstName;

    this.instanceArrFn1 = (clickEvent) => {
      const { firstName, jobDescription } = this;
      if (clickEvent) {
        console.log(
          `\n%cButton Clicked for - Instance Arrow Function in Person Constructor - instanceArrFn1`,
          'color: Royalblue;'
        );
      } else {
        console.log(
          `\n%cInstance Arrow Function in Person Constructor - instanceArrFn1`,
          'color: Royalblue;'
        );
      }
      console.log(`  ${firstName} is ${jobDescription}`);
    };

    this.instanceFnExp1 = function (clickEvent) {
      const { firstName, jobDescription } = this;
      if (clickEvent) {
        console.log(
          `\n%cButton Clicked for - Instance Function Expression in Person Constructor - instanceFnExp1`,
          'color: Royalblue;'
        );
      } else {
        console.log(
          `\n%cInstance Function Expression in Person Constructor - instanceFnExp1`,
          'color: Royalblue;'
        );
      }
      console.log(`  ${firstName} is ${jobDescription}`);
    };
  }

  instanceArrFn2 = (clickEvent) => {
    const { firstName, jobDescription } = this;
    if (clickEvent) {
      console.log(
        `\n%cButton Clicked for - Instance Arrow Function outside of Person Constructor - instanceArrFn2`,
        'color: Royalblue;'
      );
    } else {
      console.log(
        `\n%cInstance Arrow Function outside of Person Constructor - instanceArrFn2`,
        'color: Royalblue;'
      );
    }
    console.log(`  ${firstName} is ${jobDescription}`);
  };

  instanceFnExp2 = function (clickEvent) {
    const { firstName, jobDescription } = this;
    if (clickEvent) {
      console.log(
        `\n%cButton Clicked for - Instance Function Expression outside of Person Constructor - instanceFnExp2`,
        'color: Royalblue;'
      );
    } else {
      console.log(
        `\n%cInstance Function Expression outside of Person Constructor - instanceFnExp2`,
        'color: Royalblue;'
      );
    }
    console.log(`  ${firstName} is ${jobDescription}`);
  };

  // Start of Prototype Function

  protoFnPerson(clickEvent) {
    const { firstName, jobDescription } = this;
    if (clickEvent) {
      console.log(
        `\n%cButton Clicked for - Prototype Function Declared in Person Class - protoFnPerson`,
        'color: Royalblue;'
      );
    } else {
      console.log(
        `\n%cPrototype Function Declared in Person Class - protoFnPerson`,
        'color: Royalblue;'
      );
    }
    console.log(`  ${firstName} is ${jobDescription}\n`);
  }

  // Start of Static Function Located on Person Class Constructor Object

  static staticFnPerson(firstName, jobDescription, clickEvent) {
    if (clickEvent) {
      console.log(
        `\n%cButton Clicked for - Static Function located in Person Constructor Object - staticFnPerson`,
        'color: Royalblue;'
      );
    } else {
      console.log(
        `\n%cStatic Function located in Person Constructor Object - staticFnPerson`,
        'color: Royalblue;'
      );
    }
    console.log(`  ${firstName} is ${jobDescription}\n`);
  }
}

class Profession extends Person {
  constructor(firstName, job, jobDescription) {
    super(firstName);
    this.job = job;
    this.jobDescription = jobDescription;
  }

  addBtnClick1() {
    callFunction = this.instanceArrFn1.bind(null, true);
    btnCase1.addEventListener('click', callFunction);
  }
  addBtnClick2() {
    callFunction = this.instanceFnExp1.bind(this, true);
    btnCase1.addEventListener('click', callFunction);
  }
  addBtnClick3() {
    callFunction = this.instanceArrFn2.bind(null, true);
    btnCase1.addEventListener('click', callFunction);
  }
  addBtnClick4() {
    callFunction = this.instanceFnExp2.bind(this, true);
    btnCase1.addEventListener('click', callFunction);
  }
  addBtnClick5() {
    callFunction = this.protoFnPerson.bind(this, true);
    btnCase1.addEventListener('click', callFunction);
  }
  addBtnClick6() {
    callFunction = this.protoFnProfession.bind(this, true);
    btnCase1.addEventListener('click', callFunction);
  }
  addBtnClick7() {
    callFunction = this.addedProtoFnExpPerson.bind(this, true);
    btnCase1.addEventListener('click', callFunction);
  }
  addBtnClick8() {
    callFunction = this.addedProtoArrFnPerson.bind(null, this, true);
    btnCase1.addEventListener('click', callFunction);
  }
  addBtnClick9() {
    callFunction = this.addedProtoFnExpProfession.bind(this, true);
    btnCase1.addEventListener('click', callFunction);
  }
  addBtnClick10() {
    callFunction = this.addedProtoArrFnProfession.bind(null, this, true);
    btnCase1.addEventListener('click', callFunction);
  }
  addBtnClick17() {
    callFunction = Person.staticFnPerson.bind(
      null,
      this.firstName,
      this.jobDescription,
      true
    );
    btnCase1.addEventListener('click', callFunction);
  }
  addBtnClick18() {
    callFunction = Profession.staticFnProfession.bind(
      null,
      this.firstName,
      this.jobDescription,
      true
    );
    btnCase1.addEventListener('click', callFunction);
  }

  // Start of Prototype Function

  protoFnProfession(clickEvent) {
    const { firstName, jobDescription } = this;
    if (clickEvent) {
      console.log(
        `\n%cButton Clicked for - Prototype Function Declared in Profession Class - protoFnProfession`,
        'color: Royalblue;'
      );
    } else {
      console.log(
        `\n%cPrototype Function Declared in Profession Class - protoFnProfession`,
        'color: Royalblue;'
      );
    }
    console.log(`  ${firstName} is ${jobDescription}\n`);
  }

  // Start of Static Function Located on Profession Class Constructor Object

  static staticFnProfession(firstName, jobDescription, clickEvent) {
    if (clickEvent) {
      console.log(
        `\n%cButton Clicked for - Static Function located in Profession Constructor Object - staticFnProfession`,
        'color: Royalblue;'
      );
    } else {
      console.log(
        `\n%cStatic Function located in Profession Constructor Object - staticFnProfession`,
        'color: Royalblue;'
      );
    }
    console.log(`  ${firstName} is ${jobDescription}\n`);
  }
}

const frank = new Profession(
  'Frank',
  'Web Developer',
  'creating and calling JavaScript methods.'
);

const { firstName, jobDescription } = frank;
let callFunction;
const btnCase1 = document.querySelector('button');

console.log(`\n%c **********************************`, 'color: blue;');
console.log(`%c *** This is For Object = frank ***`, 'color: blue;');
console.log('\n%c *** Object Instance Methods ***', 'color: orangered;');

frank.instanceArrFn1();
frank.addBtnClick1();
btnCase1.click();

frank.instanceFnExp1();
btnCase1.removeEventListener('click', callFunction);
frank.addBtnClick2();
btnCase1.click();

frank.instanceArrFn2();
btnCase1.removeEventListener('click', callFunction);
frank.addBtnClick3();
btnCase1.click();

frank.instanceFnExp2();
btnCase1.removeEventListener('click', callFunction);
frank.addBtnClick4();
btnCase1.click();

console.log(
  '\n%c *** Object Prototype Methods Declared when Object Created ***',
  'color: orangered;'
);

frank.protoFnPerson();
btnCase1.removeEventListener('click', callFunction);
frank.addBtnClick5();
btnCase1.click();

frank.protoFnProfession();
btnCase1.removeEventListener('click', callFunction);
frank.addBtnClick6();
btnCase1.click();

console.log(
  '\n%c *** Methods Added to Prototype After Object was Created ***',
  'color: orangered;'
);

Person.prototype.addedProtoFnExpPerson = function (clickEvent) {
  const { firstName, jobDescription } = this;
  if (clickEvent) {
    console.log(
      `\n%cButton Clicked for - Function Expression Added to Person Prototype Object - addedProtoFnExpPerson`,
      'color: Royalblue;'
    );
  } else {
    console.log(
      `\n%cFunction Expression Added to Person Prototype Object - addedProtoFnExpPerson`,
      'color: Royalblue;'
    );
  }
  console.log(`  ${firstName} is ${jobDescription}`);
};

frank.addedProtoFnExpPerson();
btnCase1.removeEventListener('click', callFunction);
frank.addBtnClick7();
btnCase1.click();

Person.prototype.addedProtoArrFnPerson = (
  { firstName, jobDescription },
  clickEvent
) => {
  if (clickEvent) {
    console.log(
      `\n%cButton Clicked for - Arrow Function Added to Person Prototype Object - addedProtoArrFnPerson`,
      'color: Royalblue;'
    );
  } else {
    console.log(
      `\n%cArrow Function Added to Person Prototype Object - addedProtoArrFnPerson`,
      'color: Royalblue;'
    );
  }
  console.log(`  ${firstName} is ${jobDescription}`);
};

frank.addedProtoArrFnPerson(frank);
btnCase1.removeEventListener('click', callFunction);
frank.addBtnClick8();
btnCase1.click();

Profession.prototype.addedProtoFnExpProfession = function (clickEvent) {
  const { firstName, jobDescription } = this;
  if (clickEvent) {
    console.log(
      `\n%cButton Clicked for - Function Expression Added to Profession Prototype Object - addedProtoFnExpProfession`,
      'color: Royalblue;'
    );
  } else {
    console.log(
      `\n%cFunction Expression Added to Profession Prototype Object - addedProtoFnExpProfession`,
      'color: Royalblue;'
    );
  }
  console.log(`  ${firstName} is ${jobDescription}`);
};

frank.addedProtoFnExpProfession();
btnCase1.removeEventListener('click', callFunction);
frank.addBtnClick9();
btnCase1.click();

Profession.prototype.addedProtoArrFnProfession = (
  { firstName, jobDescription },
  clickEvent
) => {
  if (clickEvent) {
    console.log(
      `\n%cButton Clicked for - Arrow Function Added to Profession Prototype Object - addedProtoArrFnProfession`,
      'color: Royalblue;'
    );
  } else {
    console.log(
      `\n%cArrow Function Added to Profession Prototype Object - addedProtoArrFnProfession`,
      'color: Royalblue;'
    );
  }
  console.log(`  ${firstName} is ${jobDescription}`);
};

frank.addedProtoArrFnProfession(frank);
btnCase1.removeEventListener('click', callFunction);
frank.addBtnClick10();
btnCase1.click();

console.log('\n%c *** Static Class Methods ***', 'color: orangered;');

Person.staticFnPerson(firstName, jobDescription);
btnCase1.removeEventListener('click', callFunction);
frank.addBtnClick17();
btnCase1.click();

Profession.staticFnProfession(firstName, jobDescription);
btnCase1.removeEventListener('click', callFunction);
frank.addBtnClick18();
btnCase1.click();
