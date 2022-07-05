//var text = "f(x) = x^3";//document.getElementById('textArea');
  //console.log(text);

  function runDerivative() {
    var inputVal = document.getElementById("myInputDerivative").value;

    //var outputVal = document.getElementById//('textAreaResult').value;

    //if(outputVal == ''){
    //  outputVal = '';
    //}else{
    //  outputVal = '';
    //}
    // Displaying the value
    //console.log(inputVal);
    var $results = $('#textAreaResultDerivative');
    var String = 'name';
    var settings = {
      "url": "https://codex-api.herokuapp.com/",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json"
      },
      "data": JSON.stringify({
        "code": `import java.util.Scanner;

        public class Main {
        
          public static void main(String[] args) {
            String answer = "";
            Scanner input = new Scanner(System.in);
            String f = input.nextLine();
            int amount = 1;
        
            if (f.contains("x") && !f.contains("sin") && !f.contains("cos") && !f.contains("e")) {
              answer = derive(f, amount);
            } else if (f.contains("e")) {
              answer = deriveEuler(f, amount);
            } else {
              answer = deriveTrigonometric(f, amount);
            }
            System.out.println(answer);
          }
        
          public static String derive(String f, int amount) {
            /*
             * @return void
             * 
             * Calculates the Derivative of normal functions without any special operators
             * (like "e" or "sin") . It's constructed as a*x^n
             */
        
            // Save location of 'x' and '^' character, which are important Positions for
            // this Algorithm
            int amountCopy = amount;
            int locX = f.indexOf("x");
            int locN = f.indexOf("^");
        
            // Get Values of Numbers from String
            float a = -1;
            String checkX = f.substring(0, locX);
            float n = Float.parseFloat(f.substring(locN + 1));
        
            // Checks if there is a Number for a
            if (checkX.isEmpty()) {
              a = 1;
            }
        
            // Checks if n is not 0
            if (n != 0) {
              // Checks if a is exactly 1
              if (a == 1) {
                // Checks if amount is > 0 for recursion
                if (amount > 0) {
                  // Decreases a recursion step
                  amount--;
                  // sets number in front of x to current n and decreases n once for new upper
                  // number
                  String tempString = n + "x^" + (n - 1);
                  // Recursion Call
                  derive(tempString, amount);
                  // Number to mark Recursion steps
                  // int deriveNum = amount + 1;
                  if (amountCopy == 3) {
                    amountCopy = 1;
                  }
                  if (amountCopy == 1) {
                    amountCopy = 3;
                  }
                  // Sets the result String
                  return "Derivative " + amountCopy + ": " + tempString;
                }
                // If a isn't exactly 1
              } else {
                // Parse the Value of a to a float Value
                a = Float.parseFloat(f.substring(0, locX));
                // Check if amount is > 0 for recursion
                if (amount > 0) {
                  // Decreases a recursion step
                  amount--;
                  // Multiplies a with current n and decreases n once for new upper number
                  String tempString = a * n + "x^" + (n - 1);
                  // Recursion Call
                  derive(tempString, amount);
                  // Number to mark Recursion steps
                  int deriveNum = amount + 1;
                  // Sets the result String
                  return "Derivative " + deriveNum + ": " + tempString;
                }
              }
              // If n is 0 the Derivative is 0
            } else {
              // Sets the result String
              return "Derivative " + amount + ": 0";
            }
            return null;
          }
        
          public static String deriveEuler(String f, int amount) {
            /*
             * @return void
             * 
             * It derives the entered Euler function and prints the derived function on the
             * window out. It's constructed as a*e^b*x+c.
             */
        
            // Saves location of the 'e' and 'x' character since they are important
            // characters in order for the Algorithm to work
            int locE = f.indexOf("e");
            int locX = f.indexOf("x");
        
            // Checks if there is a value entered for each variable and then parses the
            // entered value or sets a default value, last gets the upper String as a whole.
            float a;
            if (!f.substring(0, locE).isEmpty()) {
              a = Float.parseFloat(f.substring(0, locE - 1));
            } else {
              a = 1.f;
            }
        
            float b;
        
            if (!f.substring(locE + 2, locX).isEmpty()) {
              b = Float.parseFloat(f.substring(locE + 2, locX - 1));
            } else {
              b = 1.f;
            }
        
            float c;
            if (!f.substring(locX + 1).isEmpty()) {
              c = Float.parseFloat(f.substring(locX + 2));
            } else {
              c = 0.f;
            }
        
            String up = f.substring(locE + 2);
        
            if (a != 0) { // Checks if a is not 0
              if (b != 0) { // Checks if b is not 0
                if (c != 0) { // Checks if c is not 0
                  // If non of the 3 Number is 0 the Derivative is calculated as a*b e^(old upper
                  // Numbers)
                  if (amount > 0) { // Recursion
                    amount--;
                    String tempString = a * b + "e^" + up;
                    deriveEuler(tempString, amount);
                    // Sets the result String
                    return "Derivative " + amount + ": " + a * b + "e^" + up;
                  }
                } else { // If a and b are not 0 but c is 0
                  // A new upper number is created which is the old upper number but without the
                  // number for c
                  if (amount > 0) {// Recursion
                    amount--;
                    int locX_up = up.indexOf("x");
                    up = up.substring(0, locX_up + 1);
                    String tempString = a * b + "e^" + up;
                    deriveEuler(tempString, amount);
                    // Sets the result String
                    // Its calculated by multiplying a with b e^ (the new upper numbers)
                    return "Derivative " + amount + ": " + a * b + "e^" + up;
                  }
                }
              } else {// If b is 0
                // b = 0 means its 0x which means that the Derivative is 0
                return "Derivative " + amount + ": 0";
              }
            } else {// If a is 0
              // a = 0 means that is 0e which means that the Derivative is 0
              return "Derivative " + amount + ": 0";
            }
            return null;
          }
        
          public static String deriveTrigonometric(String f, int amount) {
            /*
             * @return void
             * 
             * Calculates the Derivative of trigonometric functions. It's constructed as
             * a*sin(b*x), only Sine and Cosine are supported, the tangent isn't by now
             */
        
            // Save locations of the characters '(', ')', 'x' and create integer locType for
            // location of type
            int locOpeningBrace = f.indexOf("(");
            int locClosingBrace = f.indexOf(")");
            int locX = f.indexOf("x");
            int locType;
        
            // Sets the String type default to "sin" and gets the Term inside the Braces in
            // an extra string and saves the x value
            String type = "sin";
            String stringBrace = f.substring(locOpeningBrace + 1, locClosingBrace);
        
            // Checks if its a Sine or Cosine function
            if (f.contains(type)) {// If the entered String contains "sin"
              // Sets the locType to the index of 's'
              locType = f.indexOf("s");
            } else { // If f doesn't contain "sin"
              // Sets the type to "cos"
              type = "cos";
              // Sets the locType to the index of 'c'
              locType = f.indexOf("c");
            }
        
            // Initializes float a
            float a;
        
            // Derives the function
            if (type == "sin") { // If its a sine function
              // Creates a String checkA to checks if something stands before "sin"
              String checkA = f.substring(0, locType);
              // Checks if a is empty
              if (checkA.isEmpty()) {
                // If a is empty a gets set to 1 for calculation purposes
                a = 1;
        
                String retString;
                // Check if something is in front of x
                if (!f.substring(locOpeningBrace + 1, locX).isEmpty()) {
                  // Get value in front of x
                  float b = Float.parseFloat(f.substring(locOpeningBrace + 1, locX));
                  // Sets the result String
                  return "Derivative " + amount + ": " + a * b + "cos(" + stringBrace + ")";
                } else {
                  // Sets the result String
                  return "Derivative " + amount + ": " + "cos(" + stringBrace + ")";
                }
              } else { // if a is not Empty
                // Parses the Value of a to a float
                a = Float.parseFloat(f.substring(0, locType));
                String retString;
                // Check if something is in front of x
                if (!f.substring(locOpeningBrace + 1, locX).isEmpty()) {
                  // Get value in front of x
                  float b = Float.parseFloat(f.substring(locOpeningBrace + 1, locX));
                  // Sets the result String
                  return "Derivative " + amount + ": " + a * b + "cos(" + stringBrace + ")";
                } else {
                  // Sets the result String
                  return "Derivative " + amount + ": " + a + "cos(" + stringBrace + ")";
                }
              }
            } else { // If its a cosine function
              if (f.substring(0, locType).isEmpty()) { // Checks if something stand before the "cos"
                // If a is empty a gets set to 1 for calculation purposes
                a = 1;
        
                String retString;
                if (!f.substring(locOpeningBrace + 1, locX).isEmpty()) { // Check if something is in front of x
                  // Get value in front of x
                  float b = Float.parseFloat(f.substring(locOpeningBrace + 1, locX));
                  // Sets the result String
                  return "Derivative " + amount + ": -" + b + "sin(" + stringBrace + ")";
                } else {
                  // Sets the result String
                  return "Derivative " + amount + ": -" + "sin(" + stringBrace + ")";
                }
              } else { // If a isn't empty
                // Gets the Value for a and parses it to float
                a = Float.parseFloat(f.substring(0, locType));
        
                String retString;
                // Check if something is in front of x
                if (!f.substring(locOpeningBrace + 1, locX).isEmpty()) {
                  // Get value in front of x
                  float b = Float.parseFloat(f.substring(locOpeningBrace + 1, locX));
                  // Sets the result String
                  return "Derivative " + amount + ": -" + a * b + "sin(" + stringBrace + ")";
                } else {
                  // Sets the result String
                  return "Derivative " + amount + ": -" + a + "sin(" + stringBrace + ")";
                }
              }
            }
          }
        }`,
        "language": "java",
        "input": inputVal
      }),
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
      $results.append(response.output);
    });
  }