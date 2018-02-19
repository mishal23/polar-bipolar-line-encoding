
$(".plot").hide();
var string = "";
string+="Here is all about Polar line encoding"

// Typing Content
$("#about_polar").typed({
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
			$(".plot").show();

			// NRZ-L plot
			var nrzlx_axis=[];
			var nrzly_axis = [];
			var i=0;
			var k=0;
			if(arr_databit[0]=="0")
			{
				nrzlx_axis[k] = k;
				nrzly_axis[k] = 1*voltage;
			}
			else
			{
				nrzlx_axis[k] = k;
				nrzly_axis[k] = -1*voltage;	
			}
			k++;
			for(var i=0;i<arr_databit.length;i++)
			{	
				if(arr_databit[i]==1)
				{	
					nrzlx_axis[k] = k;
					nrzly_axis[k] = -1*voltage;
				}
				else
				{
					nrzlx_axis[k] = k;
					nrzly_axis[k] = 1*voltage;	
				}
				k++;
			}

			console.log(nrzlx_axis);
			console.log(nrzly_axis);

			var trace1 = {
			  x: nrzlx_axis, 
			  y: nrzly_axis, 
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

			Plotly.newPlot('nrz_l', data, layout);

			// NRZ-I plot
			var nrzix_axis=[];
			var nrziy_axis = [];
			var i=0;
			var k=0;
			console.log(arr_databit);
			if(arr_databit[0]=="0")
			{
				nrzix_axis[k] = k;
				nrziy_axis[k] = 1*voltage;
			}
			else
			{
				nrzix_axis[k] = k;
				nrziy_axis[k] = -1*voltage;	
			}
			k++;
			for(var i=0;i<=arr_databit.length-1;i++)
			{	
				if(i==0)
				{
					console.log("0 mein ghussa");
					if(arr_databit[0]=="0")
					{
						console.log("0 mila");
						nrzix_axis[k] = k;
						nrziy_axis[k] = 1*voltage;
					}
					else
					{
						nrzix_axis[k] = k;
						nrziy_axis[k] = -1*voltage;	
					}
				}
				else
				{
					if(arr_databit[i]=="0")
					{	
						nrzix_axis[k] = k;
						nrziy_axis[k] = nrziy_axis[k-1];
					}
					else
					{
						nrzix_axis[k] = k;
						nrziy_axis[k] = -1*nrziy_axis[k-1];	
					}
				}
				k++;
			}

			console.log(nrzix_axis);
			console.log(nrziy_axis);

			var trace2 = {
			  x: nrzix_axis, 
			  y: nrziy_axis, 
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

			Plotly.newPlot('nrz_i', data, layout);

			// Manchester Plot
			var manchesterx_axis=[];
			var manchestery_axis = [];
			var i=0;
			var k=0;
			if(arr_databit[0]=="0")
			{
				manchesterx_axis[k] = k;
				manchestery_axis[k] = 1*voltage;
				k++;
			}
			else
			{
				manchesterx_axis[k] = k;
				manchestery_axis[k] = -1*voltage;	
				k++;
				
			}
			
			for(var i=0;i<arr_databit.length;i++)
			{	
				if(arr_databit[i]=="1")
				{	
				manchesterx_axis[k] = k;
				manchestery_axis[k] = -1*voltage;	
				k++;
				manchesterx_axis[k] = k;
				manchestery_axis[k] = 1*voltage;
				k++;
				}
				else
				{
				manchesterx_axis[k] = k;
				manchestery_axis[k] = 1*voltage;
				k++;
				manchesterx_axis[k]=k;
				manchestery_axis[k]=-1*voltage;
				k++;
				}
				
			}

			console.log(manchesterx_axis);
			console.log(manchestery_axis);
			var manchestercopy_x_axis = [];
			var pos=0.5;
			manchestercopy_x_axis[0]=0;
			for(var i=0;i<manchesterx_axis.length;i++)
			{
				if(i!=0)
				{
					manchestercopy_x_axis[i]=pos;
					console.log(manchestercopy_x_axis[i]);
					pos+=0.5;
				}
			}
			var trace3 = {
			  x: manchestercopy_x_axis, 
			  y: manchestery_axis, 
			  mode: 'lines+markers', 
			  name: 'vh', 
			  line: {shape: 'vh'}, 
			  type: 'scatter'
			};


			var data = [trace3];

			var layout = {legend: {
			    y: 0, 
			    traceorder: 'reversed', 
			    font: {size: 16}, 
			    yref: 'paper'
			}};

			Plotly.newPlot('manchester', data, layout);

			// Differential Manchester Plot
			var diff_manchesterx_axis=[];
			var diff_manchestery_axis = [];
			var i=0;
			var k=0;
			if(arr_databit[0]=="1")
			{
				diff_manchesterx_axis[k] = k;
				diff_manchestery_axis[k] = -1*voltage;
				k++;
			}
			else
			{
				diff_manchesterx_axis[k] = k;
				diff_manchestery_axis[k] = 1*voltage;	
				k++;
				
			}
			
			for(var i=0;i<arr_databit.length;i++)
			{	
				if(arr_databit[i]=="0")
				{
                  if(diff_manchestery_axis[k-1]==1*voltage)
				  {					  
				diff_manchesterx_axis[k] = k;
				diff_manchestery_axis[k] = -1*voltage;	
				k++;
				diff_manchesterx_axis[k] = k;
				diff_manchestery_axis[k] = 1*voltage;
				k++;
				  }
				  else
				  {
				  diff_manchesterx_axis[k] = k;
				diff_manchestery_axis[k] = 1*voltage;	
				k++;
				diff_manchesterx_axis[k] = k;
				diff_manchestery_axis[k] = -1*voltage;
				k++;
				  }
				}
				else
				{
					if(diff_manchestery_axis[k-1]==1*voltage)
					{
				diff_manchesterx_axis[k] = k;
				diff_manchestery_axis[k] = 1*voltage;
				k++;
				diff_manchesterx_axis[k]=k;
				diff_manchestery_axis[k]=-1*voltage;
				k++;
					}
					else
					{
						diff_manchesterx_axis[k] = k;
				diff_manchestery_axis[k] = -1*voltage;
				k++;
				diff_manchesterx_axis[k]=k;
				diff_manchestery_axis[k]=1*voltage;
				k++;
					}
						
				}
				
			}

			console.log(diff_manchesterx_axis);
			console.log(diff_manchestery_axis);
			var diff_manchestercopy_x_axis = [];
			var pos=0.5;
			diff_manchestercopy_x_axis[0]=0;
			for(var i=0;i<diff_manchesterx_axis.length;i++)
			{
				if(i!=0)
				{
					diff_manchestercopy_x_axis[i]=pos;
					console.log(diff_manchestercopy_x_axis[i]);
					pos+=0.5;
				}
			}
			var trace4 = {
			  x: diff_manchestercopy_x_axis, 
			  y: diff_manchestery_axis, 
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

			Plotly.newPlot('differential_manchester', data, layout);

		}
		
	});
})
