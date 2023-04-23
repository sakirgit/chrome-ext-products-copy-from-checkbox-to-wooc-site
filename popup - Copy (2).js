/* ================[ Woocommerce site product by SKU ]================ */
const skuId = 'CBK-1796';
const url = 'http://docanpat.wplocal/api-check-product-by-sku?sku=' + skuId;



// Get all iframes on the page
const iframes = document.querySelectorAll('iframe');

// Loop through each iframe
for (let i = 0; i < iframes.length; i++) {
  // Get the URL of the iframe
  const url = iframes[i].src;
  // Do something with the URL, such as logging it or storing it in an array
  console.log(url);
}





async function getProduct(skuId) {
	const url = 'http://docanpat.wplocal/api-check-product-by-sku?sku=' + skuId;

	var return_json = {
		"sku": skuId
	};

	try {
		const response = await fetch(url);

		const data = await response.json();
		
		return_json["status"] = data.status;
		return return_json;
		/*
		const product = data;
		const productName = product.name;
		const productPrice = product.price;

		const productDetailsDiv = document.createElement('div');
		productDetailsDiv.setAttribute('id', 'product-details');
		productDetailsDiv.innerHTML = `<h2>${productName}</h2><p>${productPrice}</p>`;
		document.body.appendChild(productDetailsDiv);
		*/
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
		const images = document.querySelectorAll('.slider_image');

		// Create an array to store the data-zoom-image attribute values
		const dataZoomImageValues = [];

		// Loop through each image and extract the value of the data-zoom-image attribute
		images.forEach((image) => {
		const dataZoomImage = image.getAttribute('data-zoom-image');
		dataZoomImageValues.push(dataZoomImage);
		});

		/* ===========/Get images ========== */


		var productTitle = doc.querySelector('.product-name');
		var isStock = doc.querySelector('.out-of-stock');
		var productPrice = doc.querySelector('.product-price');
		var full_description = doc.querySelector('.full_description')[0];
		
		// Join the array elements with a comma
		const allImages = dataZoomImageValues.join(',');
		
		var elm_all = doc.querySelectorAll('.product-name a');
		
		/*
		const product = data;
		const productName = product.name;
		const productPrice = product.price;

		const productDetailsDiv = document.createElement('div');
		productDetailsDiv.setAttribute('id', 'product-details');
		productDetailsDiv.innerHTML = `<h2>${productName}</h2><p>${productPrice}</p>`;
		document.body.appendChild(productDetailsDiv);
		*/
	} catch (error) {
	  console.error(error);
	}
 }
 


const urls = [
"https://checkbox.live/products/allcategory?page=1",
"https://checkbox.live/products/allcategory?page=2"
];

async function waitAndLog(url, index) {
  await new Promise(resolve => setTimeout(resolve, 400 * index));

			const response = await fetch(url);
		//	console.log('theURL:', url);
			const html = await response.text();

			const parser = new DOMParser();
			const doc = parser.parseFromString(html, 'text/html');
			
			var elm = doc.querySelector('.breadcrumb');
			
			var elm_all = doc.querySelectorAll('.product-name a');
			
			var selected_item_no = elm_all.length;
			var category_flow = '';
			var category_flow_sep = ' > ';
			var sku_id = '';
						
				console.log('elm_all:: ggggg ', elm_all);

			for( var i = 0; i <= elm_all.length-1; i++ ){		
				var single_prod = 		elm_all[i].href;
				var single_prod_label = 		elm_all[i].innerText;
				
				console.log('single_prod:: ', single_prod);
				console.log('single_prod_label:: ', single_prod_label);
				sku_id = single_prod_label.split(" ");
				sku_id = sku_id[0];
				console.log('sku_id:: ', sku_id);
				var check_product =	await getProduct(sku_id);
				
				console.log('check_product:: ', check_product);
				if( check_product.status == "not_found" ){
					
				}

				/*
				if( i > 0 && i <= selected_item_no ){
					if( i == selected_item_no ){
						category_flow_sep = '';
					}
					category_flow += elm_all[i].textContent + category_flow_sep;
				}
				*/
			}
			/*
		// console.log('Selected Category:', elm_all[selected_item_no].textContent);
			var get_sku = url.split('/');
			var collected_cats = index + ' -=- "' + get_sku.pop() + '===' + category_flow + '",<br>';
		//	return '"' + get_sku.pop() + '===' + category_flow + '",';
			document.querySelector('#cat_list').innerHTML = collected_cats + document.querySelector('#cat_list').innerHTML;
			*/
}

///*
function cat_collection_1(){
	
	let cat_list = "";
	urls.forEach(async (url, index) => {
		await waitAndLog(url, index);
	});
}

const btn_get_brcr_1 = document.getElementById("get_brcr_1");
btn_get_brcr_1.addEventListener("click", function() {
	// Code to be executed when the button is clicked
	cat_collection_1();
});

//*/




/*
async function getTitle(url) {
	const response = await fetch(url);
//	console.log('theURL:', url);
	const html = await response.text();

	const parser = new DOMParser();
	const doc = parser.parseFromString(html, 'text/html');
	
	var elm = doc.querySelector('.breadcrumb');
	
	var elm_all = doc.querySelectorAll('.breadcrumb li');
	
	var selected_item_no = elm_all.length - 2;
	var category_flow = '';
	var category_flow_sep = ' > ';
				
	for( var i = 0; i <= elm_all.length-1; i++ ){
		
		if( i > 0 ){
			if( i == elm_all.length-1 ){
				category_flow_sep = '';
			}
			category_flow += elm_all[i].textContent + category_flow_sep;
		}
	}
	
// console.log('Selected Category:', elm_all[selected_item_no].textContent);
	var get_sku = url.split('/');
	return '"' + get_sku.pop() + '===' + category_flow + '",';
//	return '"' + get_sku.pop() + '===' + elm_all[selected_item_no].textContent + '",';
}

async function collectTitles(){
  const cat_list = await Promise.all(urls.map(getTitle));
  document.querySelector('#cat_list').innerHTML = cat_list.join('<br>');
}

const btn_get_brcr_1 = document.getElementById("get_brcr_1");

// Attach a click event to the button
btn_get_brcr_1.addEventListener("click", function() {
	// Code to be executed when the button is clicked
	collectTitles();
});
*/


