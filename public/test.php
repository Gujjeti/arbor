<form id="enquiryForm" class="space-y-[2rem] mt-20">
  <input type="text" name="name" placeholder="Name" class="w-full bg-transparent border-b border-[rgba(255,255,255,0.2)] focus:outline-none pb-3 placeholder-white font-normal" />
  <input type="email" name="email" placeholder="Email" class="w-full bg-transparent border-b border-[rgba(255,255,255,0.2)] focus:outline-none pb-3 placeholder-white font-normal" />
  <select name="enquiry" class="w-full bg-olive-drab border-b border-[rgba(255,255,255,0.2)] focus:outline-none pb-3 text-white font-normal">
    <option disabled selected value="">Select Enquiry</option>
    <option value="General">General</option>
    <option value="Product">Product</option>
    <option value="Support">Support</option>
  </select>
  <button type="submit" class="btn btn-primary btn-large mt-4 cursor-pointer">Submit</button>
</form>

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script>
document.getElementById('enquiryForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const form = this;
  const formData = new FormData(form);  
  const submitBtn = form.querySelector('button[type="submit"]');

  // Disable button + show loading text
  submitBtn.disabled = true;
  submitBtn.innerText = 'Submitting...';

  fetch('submit.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.text())
  .then(result => {
    Swal.fire({
      title: 'Result',
      html: result,
      icon: result.includes('Thank you') ? 'success' : 
            (result.includes('saved') ? 'warning' : 'error')
    });
    form.reset();
  })
  .catch(error => {
    Swal.fire('Error', 'Something went wrong.', 'error');
    console.error('Error:', error);
  })
  .finally(() => {
    // Re-enable button + reset text
    submitBtn.disabled = false;
    submitBtn.innerText = 'Submit';
  });
});
</script>

