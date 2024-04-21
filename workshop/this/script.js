hljs.highlightAll();

console.log(`
//*** t h i s - K E Y W O R D - R E F E R E N C E S ********
//*** "this" Keyword will refer to 1) Global Context        
//*** (window), or, 2) INSIDE A FUNCTION - Object/owner     
//*** that called the function (whether manually or         
//*** through Browser, 3) Bound data/oject. Reference       
//*** will differ whether in strict or non-strict mode      
//***                                                       
//*** With arrow functions there is no binding of this.     
//***                                                       
//*** In regular functions the this keyword represents      
//*** the object that called the function, which could      
//*** be the window, a user object, a button, or whatever.  
//*** It could also represent a binding. Regular functions  
//*** can be a declared function or a function expression.  
//***                                                       
//*** With arrow functions the this keyword always          
//*** represents the object that defined the arrow          
//*** function (The surrounding context).                   
//***                                                       
//*** So a this keyword inside of an arrow function behaves 
//*** as if it is just outside of the function in the same  
//*** context.                                              
//**********************************************************
`);

(() => {
  'use strict';

  console.log('\n\n********* strict mode *********');

  //
  //*****************************************************
  //

  console.log('\n\n*****************************************');
  console.log('*** CASE 1 ***');

  const greet1 = function (language) {
    console.log(language + ' is Fun!');
    console.log(
      `%cRegular Function called from strict mode global scope 'this' will point to undefined =`,
      'color: red;',
      this
    );
  };

  greet1('JavaScript');
})();

console.log('\n\n********* non-strict mode *********');

//
//*****************************************************
//

console.log('\n\n*****************************************');
console.log('*** CASE 2 ***');

const greet2 = function (language) {
  console.log(language + ' is Fun!');
  console.log(
    `%cRegular Function called from non-strict mode global scope 'this' will point to global window object =`,
    'color: red;',
    this
  );
};

greet2('JavaScript');

//
//****************************************************************************//
//

(() => {
  'use strict';

  console.log('\n\n********* strict mode *********');

  //
  //*****************************************************
  //

  console.log('\n\n*****************************************');
  console.log('*** CASE 3 ***');

  const development1 = {
    greet: (language) => {
      console.log(this.language + ' is Fun!');
      console.log(
        `%cArrow Function - Incorrect 'this' Binding to global window object =`,
        'color: red;',
        this
      );
      console.log(
        `%cThis Arrow Function is defined globally when object data is declared. So 'this' will point to global window object.`,
        'color: RoyalBlue;'
      );
    },
  };
  development1.greet('JavaScript');

  //
  //*****************************************************
  //

  console.log('\n\n*****************************************');
  console.log('*** CASE 3B ***');

  class Development1 {
    constructor(language) {
      this.language = language;
    }

    greet = () => {
      console.log(this.language + ' is Fun!');
      console.log(
        `%cArrow Function - Correct 'this' Binding to development1b object =`,
        'color: red;',
        this
      );
      console.log(
        `%cThis Arrow Function is defined when object is instantiated within the class so 'this' will point to the object instance.`,
        'color: RoyalBlue;'
      );
    };
  }

  const development1b = new Development1('JavaScript');

  development1b.greet('JavaScript');

  //
  //*****************************************************
  //

  console.log('\n\n*****************************************');
  console.log('*** CASE 4 ***');

  const development2 = {
    language: 'JavaScript',
    greet() {
      console.log(this.language + ' is Fun!');
      console.log(
        `%cRegular Function - Correct Binding 'this' to development2 object =`,
        'color: red;',
        this
      );
      console.log(
        `%cThis Regular Function accepts a binding. So 'this' will point to the object that called this method.`,
        'color: RoyalBlue;'
      );
    },
  };
  development2.greet();

  //
  //****************************************************************************
  //

  console.log(`
  //*****************************************************************************/
  //* The following three cases: CASE5, CASE6, CASE7:
  //* forEach executes the function therefore a regular function will have an
  //* incorrect binding assigned by the forEach method. Only with an arrow function 
  //* will 'this' point correctly to the object because there is no binding. 
  //* For an arrow function 'this' will point to the surrounding context which 
  //* is the getProfessionals() function.
  //*****************************************************************************/
  `);

  //
  //*****************************************************
  //

  console.log('\n*****************************************');
  console.log('*** CASE5 ***');

  const members1 = {
    profession: 'Web Developer',
    people: ['Frank', 'Lucy'],
    getProfessionals() {
      console.log(
        `%cArrow Function correctly uses 'this' in context of outer getProfessionals function called by members1 object.`,
        'color: red;'
      );
      console.log(
        `%cThe Binding of 'this' from the forEach method to the callback function is ignored.`,
        'color: red;'
      );
      this.people.forEach((member) => {
        console.log(member + ' - ' + this.profession);
      });
    },
  };
  members1.getProfessionals();

  //
  //*****************************************************
  //

  console.log('\n\n*****************************************');
  console.log('*** CASE6 ***');

  const members2 = {
    profession: 'Web Developer',
    people: ['Frank', 'Lucy'],
    getProfessionals() {
      console.log(
        `%cRegular Function incorrectly uses Bound 'this' by forEach method which is responsible for calling the callback function`,
        'color: red;'
      );

      this.people.forEach(function (member) {
        console.log(
          '%cStrict mode - Incorrect Binding to =',
          'color: red;',
          this
        );
        // console.log(member + ' - ' + this.profession);
      });
    },
  };
  members2.getProfessionals();
})();

//
//****************************************************************************
//
console.log('\n\n********* non-strict mode *********');

//
//*****************************************************
//

console.log('\n\n*****************************************');
console.log('*** CASE7 ***');

const members3 = {
  profession: 'Web Developer',
  people: ['Frank', 'Lucy'],
  getProfessionals() {
    console.log(
      `%cRegular Function incorrectly uses Bound 'this' by forEach method which is responsible for calling the callback function`,
      'color: red;'
    );

    this.people.forEach(function (member) {
      console.log(
        '%cNon-strict mode - Incorrect Binding to =',
        'color: red;',
        this
      );
      // console.log(member + ' - ' + this.profession);
    });
  },
};
members3.getProfessionals();

(() => {
  'use strict';

  console.log('\n\n********* strict mode *********');

  //
  //*****************************************************
  //

  console.log('\n\n*****************************************');

  const logThisArrowHandler1 = () => {
    console.log('*** CASE8 ***');

    console.log(
      `%cArrow Function - button click event - 'this' points to the surrounding context (global window object in this case) = `,
      'color: red;',
      this
    );
  };

  const btn1 = document.querySelector('.btn-1');
  btn1.addEventListener('click', logThisArrowHandler1);
  btn1.click();

  //
  //*****************************************************
  //

  console.log('\n\n*****************************************');

  const logThisArrowHandler2 = function () {
    console.log('*** CASE9 ***');

    console.log(
      `%cRegular Function - button click event - 'this' points to the currentTarget Element = `,
      'color: red;',
      this
    );
  };

  const btn2 = document.querySelector('.btn-2');
  btn2.addEventListener('click', logThisArrowHandler2);
  btn2.click();

  console.log(`\n
  //*****************************************************************************/
  //* The following are different ways of event handlers accessing object methods 
  //* using the bind keyword and arrow functions. 
  //*****************************************************************************/
 `);

  //
  //*****************************************************
  //

  console.log('\n*****************************************');
  console.log('*** CASE 10 - Method 1 - Using bind() ***');

  class Development2 {
    constructor(language) {
      this.language = language;
      this.addEventListenerFn();
    }

    greetHandler() {
      console.log('\n', this.language + ' is Fun!');
      console.log(
        `%cCorrect 'this' Binding to Object - Regular Function is called by a Bound Copy of a Regular Function that used bind when attaching Event Listener. 'this' =`,
        'color: red;',
        this
      );
    }

    // addEventListenerFn is created as prototype method as opposed to and instance method
    addEventListenerFn() {
      btn3.addEventListener('click', this.greetHandler.bind(this));
    }
  }

  const btn3 = document.querySelector('.btn-3');
  const development2 = new Development2('JavaScript');
  btn3.click();

  //
  //****************************************************************************
  //

  console.log(
    '\n\n*************************************************************************'
  );
  console.log(
    '*** CASE 11 - Method 2 - Calling Handler Function with Arrow Function ***'
  );

  class Development3 {
    constructor(language) {
      this.language = language;
      this.addEventListenerFn();
    }

    greetHandler() {
      console.log('\n', this.language + ' is Fun!');
      console.log(
        `%cCorrect 'this' Reference to Object due to using an Arrow Function that executes the Handler Function from the attached Event Listener. 'this' =`,
        'color: red;',
        this
      );
    }

    // addEventListenerFn is created as prototype method as opposed to and instance method
    addEventListenerFn() {
      btn4.addEventListener('click', () => {
        this.greetHandler();
      });
    }
  }

  const btn4 = document.querySelector('.btn-4');
  const development3 = new Development3('JavaScript');
  btn4.click();

  //
  //****************************************************************************
  //

  console.log(
    '\n\n***********************************************************************************************'
  );
  console.log(
    '*** CASE 12 - Method 3 - Defining Handler Function as an Field Containing an Arrow Function ***'
  );

  class Development4 {
    constructor(language) {
      this.language = language;
      this.addEventListenerFn();
    }

    greetHandler = () => {
      console.log('\n', this.language + ' is Fun!');
      console.log(
        `%cCorrect 'this' Reference to Object due to defining a Field with an Arrow Function as the Handler Function. 'this' =`,
        'color: red;',
        this
      );
    };

    // addEventListenerFn is created as prototype method as opposed to and instance method
    addEventListenerFn() {
      btn5.addEventListener('click', this.greetHandler);
    }
  }

  const btn5 = document.querySelector('.btn-5');
  const development4 = new Development4('JavaScript');
  btn5.click();
})();
