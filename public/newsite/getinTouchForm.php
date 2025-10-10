<form class="space-y-[4rem] mt-20" id="getinTouchForm">
                <div class="position-relative">
                    <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  id="contactName"
                  class="w-full bg-transparent border-b border-[rgba(255,255,255,0.2)] focus:outline-none pb-5 placeholder-white font-normal"
                />
                </div>
                <div class="position-relative">
                <input
                  type="email"
                  name="email"
                  id="contactEmail"
                  placeholder="Email"
                  class="w-full bg-transparent border-b border-[rgba(255,255,255,0.2)] focus:outline-none pb-5 placeholder-white font-normal"
                />
                    </div>
                    
                     <div class="position-relative">
                <select
                title="Select Enquiry"
                name="enquiry"
                id="contactEnquiry"
                  class="w-full bg-olive-drab border-b border-[rgba(255,255,255,0.2)] focus:outline-none pb-5 text-white font-normal"
                >
                  <option disabled selected class="text-white">
                    Select Enquiry
                  </option>
                  <option>General</option>
                  <option>Product</option>
                  <option>Support</option>
                </select>
                </div>

                <button
                  class="btn btn-primary btn-large mt-4 cursor-pointer"
                  type="submit"
                >
                  <span>Submit</span>
                </button>
              </form>