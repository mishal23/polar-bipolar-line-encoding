string = "";
string+="In NRZ-I the inversion or lack of inversion determines the value of the bit.<br>"
string+="Rules:<br>"
string+="• 0 bit means no change in the level of voltage<br>"
string+="• 1 bit means change the level of voltage."

// Typing Content
$("#about_nrz-i").typed({
    strings: [
      string,
    ],
    typeSpeed: 0,
  });

$(document).ready(function () {

	particlesJS.load('particles-js', '../particles.json', function() {
		console.log('callback - particles.json config loaded');
	});

	$('#terminal').height(1.8 * $('#data-entry').height());

	$('#submit').click(function(){
		
		//Reading the value of databits and voltage
		
		var data_bit = $('#data_bit').val();
		var voltage = $("#voltage").val();
		
		//Checking if the user has not entered the databits and voltage
		
		if(data_bit==="" && voltage==="")
		{
			 Materialize.toast('Please enter data bits and voltage', 1000, 'black')
		}
		else if(data_bit==="")    //Checking if the user has not entered the databits
		{
			Materialize.toast('Please enter data bits', 1000, 'black')	
		}
		else if(voltage==="")      //Checking if the user has not entered the voltage
		{
			Materialize.toast('Please enter voltage', 1000, 'black')	
		}
		else
		{
			console.log(data_bit);
			console.log(voltage);	

			arr_databit = data_bit.toString();
			var proper = true;
			var count=0;
			for(i=0;i<arr_databit.length;i++)
			{
				if(arr_databit[i]==="0" || arr_databit[i]==="1")
				{
					count++;
				}
			}
			
			//Checking if the user has not entered numerical voltage and proper databits
			
			if(count!==arr_databit.length)
			{
				proper=false;
			}
			if(!Number(voltage) && !proper)   
			{
				Materialize.toast('Please enter numerical value of voltage only, and binary databits only', 2000, 'black');
			}
			else if(!Number(voltage))            //check if voltage is not correct
			{	
				Materialize.toast('Please enter numerical value of voltage only', 2000, 'black');
			}
			else if(!proper)                    //check if databits are not proper
			{
				Materialize.toast('Please enter binary databits only', 2000, 'black');
			}
			else
			{
				var x_axis=[];
				var y_axis = [];
				var i=0;
				var k=0;
				console.log(arr_databit);
				
				//initial setting when 0 then +ve voltage when 1 then -ve voltage
				
				if(arr_databit[0]=="0")
				{
					x_axis[k] = k;
					y_axis[k] = 1*voltage;
				}
				else
				{
					x_axis[k] = k;
					y_axis[k] = -1*voltage;	
				}
				k++;
				
				
				for(var i=0;i<=arr_databit.length-1;i++)
				{	
					if(i==0)    //set for 1st bit
					{
						if(arr_databit[0]=="0")
						{
							x_axis[k] = k;
							y_axis[k] = 1*voltage;
						}
						else
						{
							x_axis[k] = k;
							y_axis[k] = -1*voltage;	
						}
					}
					else
					{
						if(arr_databit[i]=="0")       //According to NRZ-I if its 0 then no transition
						{	
							x_axis[k] = k;
							y_axis[k] = y_axis[k-1];
						}
						else                          //if its 1 then it inverts
						{
							x_axis[k] = k;
							y_axis[k] = -1*y_axis[k-1];	
						}
					}
					k++;
				}

				console.log(x_axis);
				console.log(y_axis);
				
				//Setting the specification for graph

				var trace4 = {
				  x: x_axis, 
				  y: y_axis, 
				  mode: 'lines+markers', 
				  name: 'vh', 
				  line: {shape: 'vh'}, 
				  type: 'scatter'
				};


				var data = [trace4];

				var layout = {legend: {
				    y: 0, 
				    traceorder: 'reversed', 
				    font: {size: 16}, 
				    yref: 'paper'
				}};
                //calling plotly to plot the graph
				Plotly.newPlot('nrz_i', data, layout);
			}

		}
		
	});
})
