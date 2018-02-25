
$(".plot").hide();
var string = "";
string+="Here is all about Bipolar line encoding"

// Typing Content
$("#about_bipolar").typed({
    strings: [
      string
    ],
    typeSpeed: 0,
  });

$(document).ready(function () {
	particlesJS.load('particles-js', '../particles.json', function() {
		console.log('particles.json config loaded');
	});

	$('#terminal').height($('#data-entry').height());
	
	$('#submit').click(function(){
		var data_bit = $('#data_bit').val();
		var voltage = $("#voltage").val();
		if(data_bit==="" && voltage==="")
		{
			 Materialize.toast('Please enter data bits and voltage', 1000, 'black')
		}
		else if(data_bit==="")
		{
			Materialize.toast('Please enter data bits', 1000, 'black')	
		}
		else if(voltage==="")
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
				$(".plot").show();

				// AMI plot
				var amix_axis=[];
				var amiy_axis = [];
				var i=0;
				var k=0;
				var prev=0;
				if(arr_databit[0]==0)
				{
					amix_axis[k] = k;
					amiy_axis[k] = 0;
				}
				else
				{
					amix_axis[k] = k;
					amiy_axis[k] = 1*voltage;	
				}
				k++;
				for(var i=0;i<arr_databit.length;i++)
				{	
					if(arr_databit[i]==1&&i==0)
					{	
						amix_axis[k] = k;
						amiy_axis[k] = 1*voltage;
						prev=1;
						
					}
					else
					{
					  if(arr_databit[i]==1)
					  {
						  if(prev==-1)
						  {
							  amix_axis[k]=k;
							  amiy_axis[k]=1*voltage;
							  prev=1;
							  
						  }
						  else if (prev==1)
						  {
							  amix_axis[k]=k;
							  amiy_axis[k]=-1*voltage;
							  prev=-1;
							  
					      }
						  else
						  {
							  amix_axis[k]=k;
							  amiy_axis[k]=1*voltage;
							  prev=1;
						  }
					  }
					  else
					  {
						  amix_axis[k]=k;
						  amiy_axis[k]=0;
						  
					  }
						  
	                    					  
					}
					k++;
				}

				console.log(amix_axis);
				console.log(amiy_axis);

				var trace1 = {
				  x: amix_axis, 
				  y: amiy_axis, 
				  mode: 'lines+markers', 
				  name: 'vh', 
				  line: {shape: 'vh'}, 
				  type: 'scatter'
				};


				var data = [trace1];

				var layout = {legend: {
				    y: 0, 
				    traceorder: 'reversed', 
				    font: {size: 16}, 
				    yref: 'paper'
				}};

				Plotly.newPlot('ami', data, layout);

				// PseudoTernary Plot
				var pseudoternaryx_axis=[];
				var pseudoternaryy_axis = [];
				var i=0;
				var k=0;
				var prev=0;
				if(arr_databit[0]==1)
				{
					pseudoternaryx_axis[k] = k;
					pseudoternaryy_axis[k] = 0;
				}
				else
				{
					pseudoternaryx_axis[k] = k;
					pseudoternaryy_axis[k] = 1*voltage;	
				}
				k++;
				for(var i=0;i<arr_databit.length;i++)
				{	
					if(arr_databit[i]==0 && i==0)
					{	
						pseudoternaryx_axis[k] = k;
						pseudoternaryy_axis[k] = 1*voltage;
						prev=1;
					}
					else
					{
					  if(arr_databit[i]==0)
					  {
						  if(prev==-1)
						  {
							  pseudoternaryx_axis[k]=k;
							  pseudoternaryy_axis[k]=1*voltage;
							  prev=1;
							  
						  }
						  else if (prev==1)
						  {
							  pseudoternaryx_axis[k]=k;
							  pseudoternaryy_axis[k]=-1*voltage;
							  prev=-1;
							  
					      }
						  else
						  {
							  pseudoternaryx_axis[k]=k;
							  pseudoternaryy_axis[k]=1*voltage;
							  prev=1;
						  }
					  }
					  else
					  {
						  pseudoternaryx_axis[k]=k;
						  pseudoternaryy_axis[k]=0;
						  
					  }
						  
	                    					  
					}
					k++;
				}

				console.log(pseudoternaryx_axis);
				console.log(pseudoternaryy_axis);

				var trace2 = {
				  x: pseudoternaryx_axis, 
				  y: pseudoternaryy_axis, 
				  mode: 'lines+markers', 
				  name: 'vh', 
				  line: {shape: 'vh'}, 
				  type: 'scatter'
				};


				var data = [trace2];

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
