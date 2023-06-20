

async function addNewProduct(url, data) {
	
	const options = {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	 };
	try {
	  const response = await fetch(url, options);
	  const responseData = await response.json();
		
	  return responseData;
	} catch (error) {
		console.error(error);
	}
 }
 

 async function getBrandName(descText) {

//	const url = 'https://docanpat.com/get-brandname-by-chatgpt?pasw=df015&content_text=' + descText;
	const url = 'https://docanpat.com/get-brandname-by-chatgpt?pasw=df015&content_text=' + encodeURIComponent(descText);
//	const url = 'https://docanpat.com/get-brandname-by-chatgpt?pasw=dfjHDNOASsdf0mSAJKF45643Q34t015&content_text=' + descText;

	console.log("URL for Brand :", url);

	try {
		const response = await fetch(url);

		const data = await response.json();
		
		return data;
	} catch (error) {
	  console.error(error);
	}
 }

/*
 async function getBrandName(descText) {
	const baseUrl = 'https://docanpat.com/get-brandname-by-chatgpt';
	const pasw = 'dfjHDNOASsdf0mSAJKF45643Q34t015';
 
	const queryParams = new URLSearchParams({
	  pasw: pasw,
	  content_text: descText
	});
 
	const url = `${baseUrl}?${queryParams.toString()}`;
	console.log("url:: url::", url);
	try {
	  const response = await fetch(url);
	  const data = await response.json();
	  return data;
	} catch (error) {
	  console.error(error);
	}
 }
 */
 
/*
 async function getBrandName(descText) {
	const url = 'https://docanpat.com/get-brandname-by-chatgpt'; // Replace with your target URL
 
	

	try {
	  const response = await fetch(url, {
		 method: 'POST',
		 headers: {
			'Content-Type': 'application/json' // Adjust the content type if necessary
		 },
		 body: JSON.stringify({ "desc_data": descText, "pasw": "dfNF3458hbw015" })
	  });
 
	  const responseData = await response.json();
	  return responseData;
	} catch (error) {
	  console.error(error);
	}
 }
 */


 async function getBrandName(descText) {
	const url = 'https://docanpat.com/get-brandname-by-chatgpt/'; // Replace with your PHP endpoint URL

	const descText_jsonData = {
	  pasw: 'dfNF3458hbw015',
	  content_text: descText
	};

	
	 console.log("Brand_name_API_promt:: ", descText_jsonData); 

	try {
	  const response = await fetch(url, {
		 method: 'POST',
		 headers: {
			'Content-Type': 'application/json' // Adjust the content type if necessary
		 },
		 body: JSON.stringify(descText_jsonData)
	  });

	  const responseData = await response.json();
	  return responseData;
	} catch (error) {
	  console.error(error);
	}
 }


async function getProduct(skuId) {

	var copy2baseURL = document.getElementById('copy_to_base_url').value;

	const url = copy2baseURL + 'api-check-product-by-sku?sku=' + skuId;
	console.log("copy2baseURL::", copy2baseURL);
	var return_json = {
		"sku": skuId
	};

	try {
		const response = await fetch(url);

		const data = await response.json();
		
		return_json["status"] = data.status;
		
		return return_json;
	} catch (error) {
	  console.error(error);
	}
 }
 
 //getProduct(skuId);
  /* ================================ */

  async function getProductFromCheckbox(url) {
	
	try {
		const response = await fetch(url);

		//	console.log('theURL:', url);
		const html = await response.text();

		const parser = new DOMParser();
		const doc = parser.parseFromString(html, 'text/html');
		
		/* =========== Get images ========== */
		// Get all the images with the class "slider_image"
		const images = doc.querySelectorAll('.slider_image');

		// Create an array to store the data-zoom-image attribute values
		const dataZoomImageValues = [];

		// Loop through each image and extract the value of the data-zoom-image attribute
		images.forEach((image) => {
			const dataZoomImage = image.getAttribute('data-zoom-image');
			dataZoomImageValues.push(dataZoomImage);
		});
		/* ===========/Get images ========== */
		/* =========== Get Breadcrumb ========== */
		// Create an array to store the breadcrumb items
		const breadcrumbItems = [];

		// Loop through each breadcrumb item and extract the text content, starting from the third item
		const breadcrumbLinks = doc.querySelectorAll('.breadcrumb a');
		for (let i = 0; i < breadcrumbLinks.length; i++) {
			console.log("breadcrumbLinks.length:", breadcrumbLinks.length);
			if( i > 1 ){
				breadcrumbItems.push(breadcrumbLinks[i].textContent.trim());
			}
		}

		// Join the array elements with " > "
		const resultBreadcrumb = breadcrumbItems.join(' > ');
		/* ===========/Get Breadcrumb ========== */

		var productTitle = doc.querySelector('.product-name').textContent.trim();
		var isStockQS = doc.querySelectorAll('.out-of-stock');
		var isStock = 'yes';
		isStockQS.forEach(element => {
			isStock = element.textContent;
		 });
			
		var productPrice = doc.querySelector('.product-price').textContent.trim();
		
		const full_description = doc.querySelectorAll('.full_description');
	//	console.log('full_description:: ', full_description);
		const description = full_description[0].innerHTML;
		let instructions = '';
		if(full_description[1]){
			instructions = full_description[1].innerHTML;
		}
	//	console.log('instructions:', instructions);
		// Join the array elements with a comma
		var allImages = dataZoomImageValues.join(',');
		
		var breCategories = resultBreadcrumb;
		
		var ogImageMeta = doc.querySelector('meta[property="og:image"]');
		console.log("ogImageMetagetAttrib::", ogImageMeta.getAttribute('content'));
		var smallImageUrl = '';
		if (ogImageMeta) {
		  smallImageUrl = ogImageMeta.getAttribute('content');
		}
		

		singleProductData = {
			"productTitle":productTitle,
			"isStock":isStock,
			"productPrice":productPrice,
			"full_description":description.trim().replace(/(\r\n|\n|\r)/gm, ''),
			"allImages":allImages,
			"breCategories":breCategories,
			"instructions":instructions.trim().replace(/(\r\n|\n|\r)/gm, ''),
			"smallImageUrl":smallImageUrl
		}

		return singleProductData;

	} catch (error) {
	  console.error(error);
	}
}

//getProductFromCheckbox('https://checkbox.live/product-details/101');

var actionMonitor = document.getElementById('action_monitor');

var actionMonitorTable = document.getElementById('action_monitor1');
// Insert a single cell that spans two columns

var copy_done = document.getElementById('copy_done');
var exist_found = document.getElementById('exist_found');
var total_done = document.getElementById('total_done');

var copy_done_v = 0;
var exist_found_v = 0;
var total_done_v = 0;

async function waitAndLog(url, index) {
		
		var copy2baseURL = document.getElementById('copy_to_base_url').value;

			const response = await fetch(url);
		//	console.log('theURL:', url);
			const html = await response.text();

			const parser = new DOMParser();
			const doc = parser.parseFromString(html, 'text/html');
			
			var elm_all = doc.querySelectorAll('.card .product-name a');
			
			var selected_items_count = elm_all.length;
			var percentP = 100 / selected_items_count;
			var sku_id = '';
			elm_all = Array.from(elm_all);
			elm_all.reverse();
	//		console.log('elm_all:: ggggg ', elm_all);
					
		//	actionMonitor.innerHTML = "<h4>"+ url +" <i>[START]</i></h4><hr>" + actionMonitor.innerHTML;
			actionMonitor.insertAdjacentHTML('afterbegin', "<h4>"+ url +" <i>[STARTED] </i><span style='font-size: 1.3em;'>"+ selected_items_count +"</span> Products in this page.</h4><hr>");

									
			for( var i = 0; i <= elm_all.length-1; i++ ){
				var single_prod = 		elm_all[i].href;
				var single_prod_label = 		elm_all[i].innerText;
				
				console.log('iii:: ', i);
				console.log('single_prod:: ', single_prod);
				console.log('single_prod_label:: ', single_prod_label);
				sku_id = single_prod_label.split(" ");
				sku_id = sku_id[0];
				console.log('sku_id:: ', sku_id);
				var check_product =	await getProduct(sku_id);
				
			//	console.log('check_product:: ', check_product);
				if( check_product.status == "not_found" ){
					const checkoutProduct = await getProductFromCheckbox(single_prod);


					var full_desc_tempElement = document.createElement('div');
					var full_desc = checkoutProduct.full_description;
					full_desc = full_desc.replaceAll('</', ' \n </');
					full_desc = full_desc.replaceAll('<br>', ' \n ');


					full_desc_tempElement.innerHTML = full_desc;
					
				//	console.log("full_desc_plain_html::", full_desc);
				//	console.log("full_desc_plain_text::", full_desc_tempElement.innerText);

					// Extract the plain text without HTML tags
					var full_desc_plain_text = full_desc_tempElement.innerText;
					var productBrand =	await getBrandName(full_desc_plain_text);
				//	console.log("productBrand:br:", productBrand);
					const checkoutProductData = 	{
																"allImages":checkoutProduct.allImages,
																"breCategories":checkoutProduct.breCategories,
																"productBrand":productBrand,
																"full_description":checkoutProduct.full_description,
																"instructions":checkoutProduct.instructions,
																"isStock":checkoutProduct.isStock,
																"productPrice":checkoutProduct.productPrice,
																"productTitle":checkoutProduct.productTitle,
																"productSKU":sku_id,
																"smallImageUrl":checkoutProduct.smallImageUrl
															};
					//	console.log("checkoutProduct.isStock::", checkoutProduct.isStock);
															
						const addnewProd = await addNewProduct(copy2baseURL + 'wp-json/devs-api/api-add-product-n-cat', checkoutProductData);
				
						actionMonitor.insertAdjacentHTML('afterbegin', "<div class='cl_sl'>" + (i+1) + ".</div> <div class='cl_sku'>" + sku_id + "</div> : "+ checkoutProduct.productTitle +" <a href='"+single_prod+"'>Lnk</a><br>");
						copy_done_v = copy_done_v+1;
						copy_done.innerText = copy_done_v;
					
						//	console.log(`Received data from ${url}`);
					//	console.log(`page-${index + 1} Done`);
				}else{
				
					actionMonitor.insertAdjacentHTML('afterbegin', "<div class='cl_sl'>" + (i+1) + ".</div> <div class='cl_sku'>" + sku_id + "</div> : [Already Exist !]<br>");
					exist_found_v = exist_found_v+1;
					exist_found.innerText = exist_found_v;
				}
				total_done_v = total_done_v+1;
				total_done.innerText = total_done_v;

				
				console.log("percentP::", percentP);
				document.getElementById('parts_of_pages').style.width = (percentP * (i+1)) + "%";
			}
}
///*



const urls = [

	"https://checkbox.live/products/allcategory?page=1",
	"https://checkbox.live/products/allcategory?page=2",
	/*
	"https://checkbox.live/products/allcategory?page=3",
	"https://checkbox.live/products/allcategory?page=4",
	"https://checkbox.live/products/allcategory?page=5",
	"https://checkbox.live/products/allcategory?page=6",
	"https://checkbox.live/products/allcategory?page=7",
	"https://checkbox.live/products/allcategory?page=8",
	"https://checkbox.live/products/allcategory?page=9",
	"https://checkbox.live/products/allcategory?page=10",
	"https://checkbox.live/products/allcategory?page=11",
	"https://checkbox.live/products/allcategory?page=12",
	"https://checkbox.live/products/allcategory?page=13",
	"https://checkbox.live/products/allcategory?page=14",
	
	"https://checkbox.live/products/allcategory?page=15",
	"https://checkbox.live/products/allcategory?page=16",
	"https://checkbox.live/products/allcategory?page=17",
	"https://checkbox.live/products/allcategory?page=18",
	"https://checkbox.live/products/allcategory?page=19",
	"https://checkbox.live/products/allcategory?page=20",
	"https://checkbox.live/products/allcategory?page=21",
	"https://checkbox.live/products/allcategory?page=22",
	"https://checkbox.live/products/allcategory?page=23",
	"https://checkbox.live/products/allcategory?page=24",
	"https://checkbox.live/products/allcategory?page=25",
	"https://checkbox.live/products/allcategory?page=26",
	"https://checkbox.live/products/allcategory?page=27",
	"https://checkbox.live/products/allcategory?page=28",
	"https://checkbox.live/products/allcategory?page=29",
	"https://checkbox.live/products/allcategory?page=30",
	"https://checkbox.live/products/allcategory?page=31",
	"https://checkbox.live/products/allcategory?page=32",

	"https://checkbox.live/products/allcategory?page=33",
	"https://checkbox.live/products/allcategory?page=34",
	"https://checkbox.live/products/allcategory?page=35",
	"https://checkbox.live/products/allcategory?page=36",
	"https://checkbox.live/products/allcategory?page=37",
	"https://checkbox.live/products/allcategory?page=38",
	"https://checkbox.live/products/allcategory?page=39",
	"https://checkbox.live/products/allcategory?page=40",
	
	"https://checkbox.live/products/allcategory?page=41",
	"https://checkbox.live/products/allcategory?page=42",
	"https://checkbox.live/products/allcategory?page=43",
	"https://checkbox.live/products/allcategory?page=44",
	"https://checkbox.live/products/allcategory?page=45"	
*/
];
urls.reverse();

var pages_total = document.getElementById('pages_total');
var pages_total_v = 0;
var pages_done = document.getElementById('pages_done');
var pages_done_v = 0;
var pages_processing = document.getElementById('pages_processing');
var pages_processing_v = 0;
async function product_collection(){
	pages_total_v = urls.length;
	pages_total.innerText = pages_total_v;
	pages_processing.innerText = pages_total_v - pages_done_v;
	try {
		for (let i = 0; i < urls.length; i++) {
			await waitAndLog(urls[i], i);
						
			var percent = await 100 / urls.length * (i+1);

			document.getElementById('total_prog_bar').style.width = percent + "%";

			pages_done_v = pages_done_v+1;
			pages_done.innerText = pages_done_v;

			pages_processing_v = pages_total_v - pages_done_v;
			pages_processing.innerText = pages_processing_v;
		}
		
		actionMonitor.insertAdjacentHTML('afterbegin',"<h2><i>[All pages all products collection has been completed, please check]</i></h2><hr>");
		document.getElementById('action-loader').style.animation = "none";
		document.getElementById('action-loader').style.border = "0";
		document.getElementById('action-loader').innerText = "[Done]";
	} catch (error) {
		console.error("Error fetching data:", error);
	}
}

const btn_prod_coll_start = document.getElementById("prod_coll_start");
btn_prod_coll_start.addEventListener("click", function() {
	// Code to be executed when the button is clicked
	product_collection();
	document.getElementById('prod_coll_start').style.display = "none";
	document.getElementById('action-loader').style.display = "block";
});

//*/
