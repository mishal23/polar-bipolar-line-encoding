var string = "";
string+="A variation of AMI encoding is called pseudoternanry.<br>"
string+="Rules:<br>"
string+="• 1 bit is encoded as a neutral zero voltage<br>"
string+="• 0 bit is encoded as alternating positive and negative voltages."

// Typing Content
$("#about_pseudoternary").typed({
    strings: [
      string
    ],
    typeSpeed: 0,
  });



$(document).ready(function () {

	particlesJS.load('particles-js', '../particles.json', function() {
		console.log('callback - particles.json config loaded');
	});
	$('#terminal').height(1.5 * $('#data-entry').height());

	$('#submit').click(function(){
		var data_bit = $('#data_bit').val();
		var voltage = $("#voltage").val();
		if(data_bit==="" && voltage==="")
		{
			 Materialize.toast('Please enter data bits and voltage', 1000)
		}
		else if(data_bit==="")
		{
			Materialize.toast('Please enter data bits', 1000)	
		}
		else if(voltage==="")
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
			if(count!==arr_databit.length)
			{
				proper=false;
			}
			if(!Number(voltage) && !proper)
			{
				Materialize.toast('Please enter numerical value of voltage only, and binary databits only', 2000, 'black');
			}
			else if(!Number(voltage))
			{	
				Materialize.toast('Please enter numerical value of voltage only', 2000, 'black');
			}
			else if(!proper)
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
				if(arr_databit[0]==1)
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
					if(arr_databit[i]==0 && i==0)
					{	
						x_axis[k] = k;
						y_axis[k] = 1*voltage;
						prev=1;
					}
					else
					{
					  if(arr_databit[i]==0)
					  {
						  if(prev==-1)
						  {
							  x_axis[k]=k;
							  y_axis[k]=1*voltage;
							  prev=1;
							  
						  }
						  else if (prev==1)
						  {
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
					  else
					  {
						  x_axis[k]=k;
						  y_axis[k]=0;
						  
					  }
						  
	                    					  
					}
					k++;
				}

				console.log(x_axis);
				console.log(y_axis);

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

				Plotly.newPlot('pseudoternary', data, layout);
			}
		}
		
	});
})
