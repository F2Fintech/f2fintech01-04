$(document).ready(function() {
  // Star Rating
  $('.star').click(function() {
    var rating = $(this).data('rating');
    $('#ratingStars .star').removeClass('active');
    $(this).prevAll('.star').addBack().addClass('active');
    $('#reviewRating').val(rating);
  });

  // Submit Review
  $('#reviewForm').submit(function(e) {
    e.preventDefault();
    var reviewerName = $('#reviewerName').val();
    var reviewRating = $('#reviewRating').val();
    var reviewText = $('#reviewText').val();

    // Validation
    if (!reviewerName || !reviewRating || !reviewText) {
      alert('Please fill in all fields.');
      return;
    }

    // Add review to the list
    var review = $('<div class="card mt-3"><div class="card-body"><h5 class="card-title">' + reviewerName + ' - ' + reviewRating + ' stars</h5><p class="card-text">' + reviewText + '</p></div></div>');
    $('#reviews').prepend(review);

    // Reset form
    $('#reviewerName').val('');
    $('#reviewRating').val('');
    $('#reviewText').val('');
    $('#ratingStars .star').removeClass('active');

    alert('Review submitted successfully!');
  });

  // Load existing reviews
  loadExistingReviews();

  function loadExistingReviews() {
    // In a real scenario, you would fetch existing reviews from a database or server.
    // For demonstration purposes, let's assume we have an array of review objects.
    var existingReviews = [
      { reviewerName: 'John Doe', reviewRating: 4, reviewText: 'Great product! Would buy again.' },
      { reviewerName: 'Jane Smith', reviewRating: 5, reviewText: 'Excellent service. Highly recommended.' }
    ];

    // Iterate through existing reviews and append them to the UI
    existingReviews.forEach(function(review) {
      var reviewElement = $('<div class="card mt-3"><div class="card-body"><h5 class="card-title">' + review.reviewerName + ' - ' + review.reviewRating + ' stars</h5><p class="card-text">' + review.reviewText + '</p></div></div>');
      $('#reviews').append(reviewElement);
    });
  }
});
