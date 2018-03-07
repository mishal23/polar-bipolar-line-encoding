var string = "";
string+="In NRZ-L the level of voltage determines the value of the bit.<br>"
string+="Rules:<br>"
string+="• 0 bit is represented by +V<br>"
string+="• 1 bit is represented by -V."

// Typing Content
$("#about_nrz-l").typed({
    strings: [
      string
    ],
    typeSpeed: 0,
  });

$(document).ready(function () {

	particlesJS.load('particles-js', '../particles.json', function() {
		console.log('callback - particles.json config loaded');
	});

	$('#terminal').height(1.3 * $('#data-entry').height());
	$('#submit').click(function(){
		
		//Reading the value of databits and voltage
		
		var data_bit = $('#data_bit').val();
		var voltage = $("#voltage").val();
		
		//Checking if the user has not entered the databits and voltage
		
		if(data_bit==="" && voltage==="")
		{
			 Materialize.toast('Please enter data bits and voltage', 1000, 'black')
		}
		else if(data_bit==="")   //Checking if the user has not entered the databits
		{
			Materialize.toast('Please enter data bits', 1000, 'black')	
		}
		else if(voltage==="")     //Checking if the user has not entered the voltage
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
			if(count!==arr_databit.length)       
			{                             
				proper=false;
			}
			
			//Checking if the user has not entered numerical voltage and proper databits
			if(!Number(voltage) && !proper)
			{
				Materialize.toast('Please enter numerical value of voltage only, and binary databits only', 2000, 'black');
			}
			else if(!Number(voltage))  //check if voltage is not correct
			{	
				Materialize.toast('Please enter numerical value of voltage only', 2000, 'black');
			}
			else if(!proper)           //check if databits are not proper
			{
				Materialize.toast('Please enter binary databits only', 2000, 'black');
			}
			else
			{
				console.log(arr_databit);
				var x_axis=[];
				var y_axis = [];
				var i=0;
				var k=0;
				
				//Initial Setting for time=0 
				
				
				if(arr_databit[0]==0)           //According to NRZ-L if databit is 0 
				{                               //Then y-axis should have positive voltage
					x_axis[k] = k;
					y_axis[k] = 1*voltage;
				}
				else                             //If databit is 1 the y-axis should have 
				{                                //negative voltage
					x_axis[k] = k;
					y_axis[k] = -1*voltage;	
				}
				k++;
				
				//For every databit NRZ-L rules are followed
				
				
				for(var i=0;i<arr_databit.length;i++)
				{	
					if(arr_databit[i]==1)
					{	
						x_axis[k] = k;
						y_axis[k] = -1*voltage;
					}
					else
					{
						x_axis[k] = k;
						y_axis[k] = 1*voltage;	
					}
					k++;
				}

				console.log(x_axis);
				console.log(y_axis);

				//settings done to plot the graph
				
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

				//plotly called to plot the graph
				
				Plotly.newPlot('nrz_l', data, layout);
			}
		}
		
	});
})
