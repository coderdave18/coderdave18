//var text = "f(x) = x^3";//document.getElementById('textArea');
  //console.log(text);

  function runScript() {
    var inputVal = document.getElementById("myInput").value;

    //var outputVal = document.getElementById//('textAreaResult').value;

    //if(outputVal == ''){
    //  outputVal = '';
    //}else{
    //  outputVal = '';
    //}
    // Displaying the value
    //console.log(inputVal);
    var $results = $('#textAreaResult');
    var String = 'name';
    var settings = {
      "url": "https://codex-api.herokuapp.com/",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json"
      },
      "data": JSON.stringify({
        "code": `

import java.io.IOException;
import java.util.Scanner;

public class Main{

	private static String NR1 = "";
	private static String NR2 = "";
	
	public static void main(String[] args) throws IOException {	
		String answer = "";
		Scanner input = new Scanner(System.in);
		String function = input.nextLine();
		if(function.contains("^") && !function.contains("e") && !function.contains("sin") && !function.contains("*")) {
			answer = stammFunktionKettenRegel(function);
		}else if(function.contains("e") && !function.contains("+")) {
			answer = stammFunktionE(function);
		}else if(function.contains("ln")) {
			answer = stammFunktionLn(function);
		}else if(function.contains("/x")) {
			answer = stammFunktionXhochminus(function);
		}else if(function.contains("sin")) {
			answer = stammFunktionSinus(function);
		}else if(function.contains("cos")) {
			answer = stammFunktionCosinus(function);
		}else if(function.contains("*")) {
			answer = stammFunktionProduktRegel(function);
		}else if(function.contains("sqrt")) {
			answer = stammFunktionSqrt(function);
		}
			System.out.println("F(x) = " + answer);
	}
	
	private static String stammFunktionSqrt(String function) {
		String Function = function.substring(6);
		float a;
		String newBase = "";
		float Exp = (float) 0.5;
		float newExp = Exp + 1;
		
		int index = Function.indexOf('x');
		if(Function.charAt(index - 1) == '(' && Function.charAt(index + 1) == ')') {
			a = Exp + 1;
			return a + " x^" + newExp + " + C";
		}
		
		return "";
	}

	private static String stammFunktionXhochminus(String function) {
		int x = 1;
		String aConst = "";
		if(function.contains("/")) {
			for(int t = 6; t < function.length(); t++) {
				if(function.charAt(t) == '/') {
					NR1 = function.substring(7, t);
					NR2 = function.substring(t + 1, function.length());
					return NR1 + " ln(|" + NR2 + "|) + C";
				}
			}
		}
		return "";
	}

	private static String stammFunktionLn(String function) {
		String Function = function.substring(6);
		String newBracket = "brack";
		String newBase = "";
		int x = 1;
		int v = 1;
		int y;

		for(y = 0; y <= Function.length(); y++) {
			char z = Function.charAt(y);
			if (z == '(') {
				x = y;
			}
			if(z == ')') {
				v = y;
				newBracket = Function.substring(x + 1, v);
				if(Function.contains(" ln")) {
					return "x (ln(" + newBracket + ") -1) + C";
				}else{
					newBase = getA(Function);
					return newBase + "x (ln(" + newBracket + ") -1) + C";
				}
			}
		}
		return "";
	}

	private static String stammFunktionSinus(String function) {
		String Function = function.substring(6);
		String newBase = "";
		String aConst = "";
		String newBracket = "";
		String newDerivBrack = "";

		if(function.contains("= sin(x)")) {
			return "-cos(x)";
		}else if(function.contains("= -sin(x)")) {
			return "cos(x)";
		}else{
			if(Function.contains("-sin")) {
				newBase = " cos";
			}else{
				newBase = " -cos";
			}
			int x = 1;
			int v = 1;
			int a = 1;
			int y;

			for(y = 0; y <= Function.length(); y++) {
				char z = Function.charAt(y);
				if(z == 'x') {
					a = y;
				}

				if(z == '(') {
					x = y;
				}
				if(z == ')') {
					v = y;

					if(Function.contains("(x)")) {
						newBracket = "(x)";
					}else{
						newBracket = Function.substring(x + 1, v);
						newDerivBrack = "" + Function.charAt(a - 1);
					}
					if(function.contains("= sin") || function.contains("= -sin")) {
						if(newBracket == "x") {
							return newBase + "(" + newBracket + ")" + " + C";
						}else{
							return "1/" + newDerivBrack + newBase + "(" + newBracket + ")" + " + C";
						}
					}else{
						if(Function.contains("(x)")) {
							aConst = getA(Function);
							return aConst + newBase + newBracket + " + C";
						}else{
							aConst = getA(Function);
							return aConst + "/" + newDerivBrack + newBase + "(" + newBracket + ")" + " + C";
						}
					}
				}
			}
		}
		return "";
	}

	private static String stammFunktionCosinus(String function) {

		String Function = function.substring(6);
		String newBase = "";
		String aConst = "";
		String newBracket = "";
		String newDerivBrack = "";

		if(function.contains("= cos(x)")) {
			return "sin(x)";
		}else if(function.contains("= -cos(x)")) {
			return "-sin(x)";
		}else{
			if(Function.contains("-cos")) {
				newBase = " -sin";
			}else{
				newBase = " sin";
			}
			int x = 1;
			int v = 1;
			int a = 1;
			int y;

			for(y = 0; y <= Function.length(); y++) {
				char z = Function.charAt(y);
				if(z == 'x') {
					a = y;
				}

				if(z == '(') {
					x = y;
				}
				if(z == ')') {
					v = y;

					if(Function.contains("(x)")) {
						newBracket = "(x)";
					}else{
						newBracket = Function.substring(x + 1, v);
						newDerivBrack = "" + Function.charAt(a - 1);
					}
					if(function.contains("= cos") || function.contains("= -cos")) {
						if(newBracket == "x") {
							return newBase + "(" + newBracket + ")" + " + C";
						}else{
							return "1/" + newDerivBrack + newBase + "(" + newBracket + ")" + " + C";
						}
					}else{
						if(Function.contains("(x)")) {
							aConst = getA(Function);
							return aConst + newBase + newBracket + " + C";
						}else{
							aConst = getA(Function);
							return aConst + "/" + newDerivBrack + newBase + "(" + newBracket + ")" + " + C";
						}
					}
				}
			}
		}

		return "";
	}

	private static String stammFunktionProduktRegel(String function) {
		String Function = "";
		String power1;
		String power2;
		String a1 = "";
		String a2 = "";
		String newPower = "";
		String newA = "";
		if(function.contains("*")) {
			for(int t = 6; t < function.length(); t++) {
				if(function.charAt(t) == '*') {
					NR1 = function.substring(6, t - 1);
					NR2 = function.substring(t + 1, function.length());
					power1 = getPower(NR1);
					power2 = getPower(NR2);
					int p1 = Integer.parseInt(power1);
					int p2 = Integer.parseInt(power2);
					int p = p1 + p2;
					newPower = "" + p;
					if(NR1.contains(" x")) { 
						if(NR2.contains(" x")) {
							Function = " x^" + newPower;
							return calcNorm(Function) + " + C";
						}else {
							a2 = getA(NR2);
							newA = "" + a2;
							String F = newA + "x^" + newPower;
							return calcNorm(F) + " + C";
						}
					}else {
						if(NR2.contains(" x")) {
							a1 = getA(NR1);
							newA = "" + a1;
							String F = newA + "x^" + newPower;
							return calcNorm(F) + " + C";
						}else {
							a1 = getA(NR1);
							a2 = getA(NR2);
							int a11 = Integer.parseInt(a1);
							int a22 = Integer.parseInt(a2);
							int A = a11*a22;
							newA = " " + A;
							String F = newA + "x^" + newPower;
							System.out.println(F);
							return calcNorm(F) + " + C";
						}
					}
				}
			}
		}

		return "";
	}

	private static String stammFunktionE(String function) {
		String Function = function.substring(6);
		String newExponent = " exp";
		String newBase = "base";
		String aComp = "a";
		if(Function.contains(" e")) {
			newBase = "e";
			aComp = "1";
		}else{
			aComp = getA(Function);
			newBase = aComp + "e";
		}
		if(Function.contains("^x")) {
			newExponent = "^x";

		}else{
			String exp = "";
			exp = getPowerE(Function);
			newExponent = "^" + exp + "x";
			newBase = aComp + "/" + exp + " e";
		}

		String antiDerivative = newBase + newExponent;

		return antiDerivative + " + C";
	}
	

	private static String stammFunktionKettenRegel(String function) {
		if(function.contains("+")) {
			for(int t = 6; t < function.length(); t++) {
				if(function.charAt(t) == '+') {
					NR1 = function.substring(6, t - 1);
					NR2 = function.substring(t + 1, function.length());
				}
			}

			if(NR1.contains("^")) {
				if(!NR2.isEmpty()) {
					String opo = calcNorm(NR1);
					String opp;
					if(NR2.contains("^")) {
						opp = calcNorm(NR2);
						return opo + " + " + opp + " + C";
					}
				}
			}

		}else{
			String opo = calcNorm(function.substring(6));
			return opo + " + C";
		}
		return "";
	}

	private static String calcNorm(String nR1) {
		String tempString = getPower(nR1);

		float newExponent = Float.parseFloat(tempString) + 1;
		String tempString2 = String.valueOf(newExponent);

		if(nR1.contains(" x")) {
			String newConstant = "1/" + tempString2;
			String antiDerivative = newConstant + " x^" + newExponent;
			return antiDerivative;
		}else{
			String newA = getA2(nR1);
			String newConstant = newA + "/" + tempString2;
			String antiDerivative = newConstant + " x^" + newExponent;
			return antiDerivative;
		}

	}
	
	private static String getPowerE(String function) {
		String d = "";
		String newExp;
		int x = -10;
		int y;
		for(y = 0; y < function.length(); y++) {
			char z = function.charAt(y);
			if(z == 'x') {
				x = y;
			}
		}

		for(int i = 0; i <= function.length(); i++) {
			char tempChar = function.charAt(i);

			if(tempChar == '^') {
				newExp = function.substring(i + 1, x);
				return newExp;
			}
		}
		return d;
	}

	private static String getA(String function) {

		String defaultValue = "";
		String newBase = "";
		for(int i = 0; i < function.length(); i++) {
			char tempChar = function.charAt(i);

			if(tempChar == 'e' || tempChar == 'x' || tempChar == 'l' || tempChar == 's' || tempChar == 'c' || tempChar == '-') {
				newBase = function.substring(1, i);
				return newBase;
			}
		}

		return defaultValue;
	}

	private static String getPower(String nR12) {
		String Default = "iwas";

		for(int i = 0; i <= nR12.length(); i++) {
			char tempChar = nR12.charAt(i);

			if(tempChar == '^') {
				return nR12.substring(i + 1, nR12.length());
			}
		}
		return Default;
	}

	private static String getA2(String function) {

		String defaultValue = "";
		String newBase = "";
		for(int i = 0; i < function.length(); i++) {
			char tempChar = function.charAt(i);

			if(tempChar == 'e' || tempChar == 'x' || tempChar == 'l' || tempChar == 's' || tempChar == 'c' || tempChar == '-') {
				newBase = function.substring(0, i);
				return newBase;
			}
		}
		return defaultValue;
	}

}
        `,
        "language": "java",
        "input": inputVal
      }),
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
      $results.append(response.output);
    });
  }