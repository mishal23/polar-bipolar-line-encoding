var string = "";
string+="It is the combination of RZ and NRZ-I.<br>" 
string+="The transition is in the middle of the bit but this time value of the bit decides which transition.<br>"
string+="Rules<br>"
string+="• 0 means transition<br>"
string+="• 1 means no transition."

// Typing Content
$("#about_differentialmanchester").typed({
    strings: [
      string
    ],
    typeSpeed: 0,
  });



$(document).ready(function () {

	particlesJS.load('particles-js', '../particles.json', function() {
		console.log('particles.json config loaded');
	});

	$('#terminal').height(1.5 * $('#data-entry').height());


	$('#submit').click(function(){
		//Reading the value of databits and voltage
		var data_bit = $('#data_bit').val();
		var voltage = $("#voltage").val();
		
		//Checking if the user has not entered the databits and voltage
		
		if(data_bit==="" && voltage==="")
		{
			 Materialize.toast('Please enter data bits and voltage', 1000, 'black')
		}
		else if(data_bit==="")  //Checking if the user has not entered the databits
		{
			Materialize.toast('Please enter data bits', 1000, 'black')	
		}
		else if(voltage==="")    //Checking if the user has not entered the voltage
		{
			Materialize.toast('Please enter voltage', 1000, 'black')	
		}
		else
		{
			console.log(data_bit);
			console.log(voltage);	
			arr_databit = data_bit.toString();
			console.log(arr_databit);
			var proper = true;
			var count=0;
			for(i=0;i<arr_databit.length;i++)
			{
				if(arr_databit[i]==="0" || arr_databit[i]==="1")
				{
					count++;
				}
			}
			
			//Checking if the user has entered only 0s and 1s as databits and numerical value of voltage
			
			if(count!==arr_databit.length)
			{
				proper=false;
			}
			if(!Number(voltage) && !proper)
			{
				Materialize.toast('Please enter numerical value of voltage only, and binary databits only', 2000, 'black');
			}
			else if(!Number(voltage))   //check if voltage is not correct
			{	
				Materialize.toast('Please enter numerical value of voltage only', 2000, 'black');
			}
			else if(!proper)            //check if databits are not proper
			{
				Materialize.toast('Please enter binary databits only', 2000, 'black');
			}
			else
			{
				var x_axis=[];
				var y_axis = [];
				var i=0;
				var k=0;
				
				//initial setting for time=0
				//0 means +ve voltage
				//1 means -ve voltage
				
				if(arr_databit[0]=="1")
				{
					x_axis[k] = k;
					y_axis[k] = -1*voltage;
					k++;
				}
				else
				{
					x_axis[k] = k;
					y_axis[k] = 1*voltage;	
					k++;
					
				}
				
				for(var i=0;i<arr_databit.length;i++)
				{	
					if(arr_databit[i]=="0")          //According to Differential Manchester Rules
					{                                //if the bit is 0 and previous level of voltage is +ve
	                  if(y_axis[k-1]==1*voltage)     //for first half it is -ve voltage
					  {					             //for second half it is +ve voltage
					   x_axis[k] = k;                //if previous level is -ve then
					   y_axis[k] = -1*voltage;	     //for first half it is +ve voltage  
					   k++;                          //for second half it is -ve voltage
					   x_axis[k] = k;
					   y_axis[k] = 1*voltage;
					   k++;
					  }
					  else
					  {
					  x_axis[k] = k;
					  y_axis[k] = 1*voltage;	
					  k++;
					  x_axis[k] = k;
					  y_axis[k] = -1*voltage;
					  k++;
					  }
					}
					else
					{
						if(y_axis[k-1]==1*voltage)        //if the bit is 1 and previous level of voltage is +ve
						{                                 //for first half it is +ve voltage
					     x_axis[k] = k;                   //for second half it is -ve voltage
					     y_axis[k] = 1*voltage;           //if previous level is -ve then
					     k++;                             //for first half it is -ve voltage
					     x_axis[k]=k;                     //for second half it is +ve voltage
					     y_axis[k]=-1*voltage;
					     k++;
						}
						else
						{
						  x_axis[k] = k;
					      y_axis[k] = -1*voltage;
					      k++;
					      x_axis[k]=k;
					      y_axis[k]=1*voltage;
					      k++;
						}
							
					}
					
				}

				console.log(x_axis);
				console.log(y_axis);
				//setting graph to transit at the middle
				var copy_x_axis = [];
				var pos=0.5;
				copy_x_axis[0]=0;
				for(var i=0;i<x_axis.length;i++)
				{
					if(i!=0)
					{
						copy_x_axis[i]=pos;
						console.log(copy_x_axis[i]);
						pos+=0.5;
					}
				}
				//setting graph specifications
				var trace4 = {
				  x: copy_x_axis, 
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
				Plotly.newPlot('differential_manchester', data, layout);
			}

		}
		
	});
})