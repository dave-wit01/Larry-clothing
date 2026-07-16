export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-primary mb-8">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
          ></textarea>
          <button className="w-full bg-secondary text-primary py-2 rounded-lg font-bold hover:bg-accent transition">
            Send Message
          </button>
        </form>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-primary mb-2">Email</h3>
            <p className="text-gray-600">contact@larryclothing.com</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-primary mb-2">Phone</h3>
            <p className="text-gray-600">+1 (555) 123-4567</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-primary mb-2">Address</h3>
            <p className="text-gray-600">
              123 Fashion Street<br />
              New York, NY 10001<br />
              USA
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
