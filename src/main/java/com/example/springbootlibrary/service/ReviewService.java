package com.example.springbootlibrary.service;

import com.example.springbootlibrary.dao.BookRepository;
import com.example.springbootlibrary.dao.ReviewRepository;
import com.example.springbootlibrary.entity.Review;
import com.example.springbootlibrary.requestmodels.ReviewRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;

@Service
@Transactional
public class ReviewService {

    private ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository){this.reviewRepository = reviewRepository;}

    public void postReview(String userEmail, ReviewRequest reviewRequest) throws Exception{

        Review validateReview = reviewRepository.findByUserEmailAndBookId(userEmail,reviewRequest.getBookId());

        if(validateReview !=null){
           throw new Exception("Review already created");
        }

        Review review = new Review();

        review.setUserEmail(userEmail);
        review.setBookId(reviewRequest.getBookId());
        review.setRating(reviewRequest.getRating());

        if(reviewRequest.getReviewDescription().isPresent()){
            review.setReviewDescription(reviewRequest.getReviewDescription().map(
                    Object::toString
            ).orElse(null));
        }

        review.setDate(Date.valueOf(LocalDate.now()));

        reviewRepository.save(review);

    }

    public Boolean userReviewListed(String userEmail,Long bookId){

        Review validateReview =reviewRepository.findByUserEmailAndBookId(userEmail,bookId);

        if(validateReview!=null){return true;}

        return false;
    }

}
