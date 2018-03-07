var string = "";
string+="AMI means Alternate Mark Inversion<br>"
string+="Rules:<br>"
string+="• 0 bit is represented by neutral zero voltage<br>"
string+="• 1 bit is represented alternating positive and negative voltage."

// Typing Content
$("#about_ami").typed({
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
			 Materialize.toast('Please enter data bits and voltage', 1000)
		}
		else if(data_bit==="")  //Checking if the user has not entered the databits
		{
			Materialize.toast('Please enter data bits', 1000)	
		}
		else if(voltage==="")    //Checking if the user has not entered the voltage
		{
			Materialize.toast('Please enter voltage', 1000)	
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
				var x_axis=[];
				var y_axis = [];
				var i=0;
				var k=0;
				var prev=0;
				
				//initial setting for time=0
				//0 means 0 voltage
				//1 means +ve voltage
				
				if(arr_databit[0]==0)
				{
					x_axis[k] = k;
					y_axis[k] = 0;
				}
				else
				{
					x_axis[k] = k;
					y_axis[k] = 1*voltage;	
				}
				k++;
				for(var i=0;i<arr_databit.length;i++)
				{	
					if(arr_databit[i]==1&&i==0)   //if first bit is 1 then its +ve voltage
					{	
						x_axis[k] = k;
						y_axis[k] = 1*voltage;
						prev=1;
						
					}
					else
					{
					  if(arr_databit[i]==1)       //if bit is 1 and previous voltage level is -ve
					  {                           //current level is +ve
						  if(prev==-1)
						  {
							  x_axis[k]=k;
							  y_axis[k]=1*voltage;
							  prev=1;
							  
						  }
						  else if (prev==1)        //if bit is 1 and previous voltage level is +ve
						  {                        //current level is -ve
							  x_axis[k]=k;
							  y_axis[k]=-1*voltage;
							  prev=-1;
							  
					      }
						  else
						  {
							  x_axis[k]=k;
							  y_axis[k]=1*voltage;
							  prev=1;
						  }
					  }
					  else                    //if bit=0 then 0 voltage
					  {
						  x_axis[k]=k;
						  y_axis[k]=0;
						  
					  }
						  
	                    					  
					}
					k++;
				}

				console.log(x_axis);
				console.log(y_axis);
				//setting graph specifications
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
				Plotly.newPlot('ami', data, layout);
			}

		}
		
	});
})
